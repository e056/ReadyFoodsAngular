import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
import { NgForm } from '@angular/forms';

import { OrderEntity } from 'src/app/models/order-entity';
import { OrderEntityService } from 'src/app/services/order-entity.service';
import { SessionService } from 'src/app/services/session.service';
import { Message, MessageService,ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrls: ['./view-all-orders.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewAllOrdersComponent implements OnInit {

  allOrders: OrderEntity[];


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private orderEntityService: OrderEntityService,
    private messageService: MessageService) {
      this.allOrders = new Array();
    }

  ngOnInit(): void {
    this.checkAccessRight();
    console.log('********** ViewAllOrdersComponent.ts: ' + "init");
    this.orderEntityService.getAllOrders().subscribe({
      next: (response) => {
        console.log('********** ViewAllOrdersComponent.ts2222222222222222: ' + "init");
        this.allOrders = response;
        console.log(this.allOrders);

      },
      error: (error) => {
        console.log('********** ViewAllOrdersComponent.ts: ' + error);
      }
    });
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

}
