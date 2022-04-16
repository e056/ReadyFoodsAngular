import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
import { NgForm } from '@angular/forms';

import { OrderEntity } from 'src/app/models/order-entity';
import { OrderEntityService } from 'src/app/services/order-entity.service';
import { SessionService } from 'src/app/services/session.service';
import { Message, MessageService,ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-view-all-subscription-orders',
  templateUrl: './view-all-subscription-orders.component.html',
  styleUrls: ['./view-all-subscription-orders.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewAllSubscriptionOrdersComponent implements OnInit {

  orders: OrderEntity[]

  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;
  display : boolean

  orderToView: OrderEntity



  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private orderEntityService: OrderEntityService,
    private messageService: MessageService) {
      this.display = false;
      this.orderToView = new OrderEntity();
      this.orders = new Array();
  
  
      this.resultSuccess = false;
      this.resultError = false;
     }

  ngOnInit(): void {

    console.log('********** ViewAllSubOrders.ts: ' + "init");
    this.orderEntityService.getAllSubscriptionOrders().subscribe({
      next: (response) => {
        this.orders = response;
        console.log('********** ViewAllSubOrders.ts: ' + this.orders)
      },
      error: (error) => {
        console.log('********** ViewAllSubOrders.ts: ' + error);
      }
    });
  }

}
