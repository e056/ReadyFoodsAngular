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
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrls: ['./view-all-orders.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewAllOrdersComponent implements OnInit {

  allOrders: OrderEntity[];

  displayUpdate: boolean = false;
  orderToUpdate: OrderEntity;

  statuses: any[];
  usableStatuses: string[];

  submitted: Boolean;
  resultSuccess: Boolean;
  resultError: Boolean;
  message: string | undefined;

  newStatus: Status | undefined;



  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private orderEntityService: OrderEntityService,
    private messageService: MessageService) {
    this.allOrders = new Array();

    this.orderToUpdate = new OrderEntity();

    this.resultSuccess = false;
    this.resultError = false;
    this.submitted = false;
    this.statuses = Object.keys(Status);
    this.usableStatuses = Object.keys(Status);
    const index = this.usableStatuses.indexOf("RECEIVED", 0);
    if (index > -1) {
      this.usableStatuses.splice(index, 1); // remove "RECEIVED"
    }
 

  }

  ngOnInit(): void {
    this.checkAccessRight();
    this.retrieveOrders();
  }

  retrieveOrders() {
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

  showDialogUpdate(orderToUpdate: OrderEntity) {
    this.orderToUpdate = orderToUpdate;
    this.displayUpdate = true;
  }

  update(updateStatusForm: NgForm) {
    this.submitted = true;
    if (updateStatusForm.valid) {

      console.log('********** Form is valid')

      this.orderEntityService.updateOrder(this.orderToUpdate, this.newStatus!).subscribe({
        next: (response) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "ID: " + this.orderToUpdate.orderEntityId;
          this.messageService.add({
            severity: 'success',
            summary: 'Order status updated successfully:', detail: this.message
          });
          this.retrieveOrders();
          console.log('********** RE-Retrieved orders')


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
