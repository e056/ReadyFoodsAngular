import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
import { NgForm } from '@angular/forms';
import { Status } from 'src/app/models/status';
import { Table } from 'primeng/table';

import { OrderEntity } from 'src/app/models/order-entity';
import { OrderEntityService } from 'src/app/services/order-entity.service';
import { SessionService } from 'src/app/services/session.service';
import { Message, MessageService, ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-view-all-subscription-orders',
  templateUrl: './view-all-subscription-orders.component.html',
  styleUrls: ['./view-all-subscription-orders.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewAllSubscriptionOrdersComponent implements OnInit {

  orders: OrderEntity[]

  displayUpdate: boolean = false;
  orderToView: OrderEntity

  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;

  statuses: any[];
  usableStatuses: string[];
  newStatus: Status | undefined;






  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private orderEntityService: OrderEntityService,
    private messageService: MessageService) {
    this.orderToView = new OrderEntity();
    this.orders = new Array();


    this.resultSuccess = false;
    this.resultError = false;

    this.statuses = Object.keys(Status);
    this.usableStatuses = Object.keys(Status);
    var index = this.usableStatuses.indexOf("RECEIVED", 0);
    if (index > -1) {
      this.usableStatuses.splice(index, 1); // remove "RECEIVED"
    }

    index = this.usableStatuses.indexOf("PROCESSED", 0);
    if (index > -1) {
      this.usableStatuses.splice(index, 1); // remove "RECEIVED"
    }

    index = this.usableStatuses.indexOf("PENDING", 0);
    if (index > -1) {
      this.usableStatuses.splice(index, 1); // remove "RECEIVED"
    }
  }

  ngOnInit(): void {
    this.retrieveAllSubOrders();


  }

  retrieveAllSubOrders() {

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

  processAllSubscriptionOrders() {
    this.orderEntityService.processAllSubscriptionOrders().subscribe({
      next: (response) => {

        this.messageService.add({
          severity: 'success',
          summary: 'Orders processed:', detail: "x" + response
        });
        this.retrieveAllSubOrders();

      },
      error: (error) => {
        console.log('********** ViewAllProductsComponent.ts: ' + error);
      }
    });

  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

  showDialogUpdate(orderToView: OrderEntity) {
    this.orderToView = orderToView;
    this.displayUpdate = true;
  }

  update(updateStatusForm: NgForm) {
    if (updateStatusForm.valid) {

      console.log('********** Form is valid')

      this.orderEntityService.updateOrder(this.orderToView, this.newStatus!).subscribe({
        next: (response) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "ID: " + this.orderToView.orderEntityId;
          this.messageService.add({
            severity: 'success',
            summary: 'Order status updated successfully:', detail: this.message
          });
          this.retrieveAllSubOrders();
          console.log('********** RE-Retrieved orders')
          this.displayUpdate = false;


        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while updating the enquiry: " + error;

          console.log('**********  view-all-enquires.ts: ' + error);
        }
      });
    }
  }

  clear(table: Table) {
    table.clear();
  }

}
