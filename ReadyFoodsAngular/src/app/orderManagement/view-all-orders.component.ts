import { OrderEntity } from './../models/order-entity';
import { OrderEntityService } from '../services/order-entity.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';

import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrls: ['./view-all-orders.component.css'],
  providers: [MessageService]
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
