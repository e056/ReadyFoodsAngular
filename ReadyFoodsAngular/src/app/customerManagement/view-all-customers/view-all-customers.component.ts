import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';


import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';
import { Message, MessageService, ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-view-all-customers',
  templateUrl: './view-all-customers.component.html',
  styleUrls: ['./view-all-customers.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class ViewAllCustomersComponent implements OnInit {
  customers: Customer[]

  customerToView: Customer

  display: boolean

  resultSuccess: boolean;
  resultError: boolean;

  message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

    this.customers = new Array();
    this.customerToView = new Customer();
    this.display = false;

    this.resultSuccess = false;
    this.resultError = false;
  }



  ngOnInit(): void {
    this.checkAccessRight();
    this.retrieveAllCustomers();

  }

  clear(table: Table) {
    table.clear();
  }

  retrieveAllCustomers() {
    console.log('********** ViewAllCustomers.ts: ' + "init");
    this.customerService.getEnquires().subscribe({
      next: (response) => {
        this.customers = response;
        console.log('********** ViewAllCustomers.ts: ' + this.customers)
      },
      error: (error) => {
        console.log('********** ViewAllCustomers.ts: ' + error);
      }
    });

  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

  showDialog(customer: Customer) {
    this.display = true;
    this.customerToView = customer;

  }

  
  confirmBan(event: Event) {
    if (this.customerToView.isBanned) return
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to ban this customer?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.customerService.banCustomer(this.customerToView.customerId!).subscribe({
          next: (response) => {
            this.resultSuccess = true;
            this.resultError = false;
            this.message = "ID: " + this.customerToView.customerId;
            this.messageService.add({
              severity: 'success',
              summary: 'Customer banned:', detail: this.message
            });
            this.retrieveAllCustomers();

          },
          error: (error) => {
            this.resultError = true;
            this.resultSuccess = false;
            this.message = "An error has occurred while banning: " + error;
          }
        });

      },
      reject: () => {
        //reject action
      }
    });
  }

  
  confirmUnban(event: Event) {
    if (!this.customerToView.isBanned) return
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to unban this customer?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.customerService.unbanCustomer(this.customerToView.customerId!).subscribe({
          next: (response) => {
            this.resultSuccess = true;
            this.resultError = false;
            this.message = "ID: " + this.customerToView.customerId;
            this.messageService.add({
              severity: 'success',
              summary: 'Customer unbanned:', detail: this.message
            });
            this.retrieveAllCustomers();

          },
          error: (error) => {
            this.resultError = true;
            this.resultSuccess = false;
            this.message = "An error has occurred while banning: " + error;
          }
        });

      },
      reject: () => {
        //reject action
      }
    });
  }




  // confirm(event: Event) {
  //   if (this.customerToView.isBanned) return
  //   this.confirmationService.confirm({
  //     target: event.target!,
  //     message: 'Are you sure that you want to proceed? This ban (on reviewing and commenting) cannot be reversed.',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {

  //       this.customerService.banCustomer(this.customerToView.customerId!).subscribe({
  //         next: (response) => {
  //           this.resultSuccess = true;
  //           this.resultError = false;
  //           this.message = "ID: " + this.customerToView.customerId;
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Customer banned:', detail: this.message
  //           });

  //         },
  //         error: (error) => {
  //           this.resultError = true;
  //           this.resultSuccess = false;
  //           this.message = "An error has occurred while updating the enquiry: " + error;

  //           console.log('**********  view-all-enquires.ts: ' + error);
  //         }
  //       });

  //     },
  //     reject: () => {
  //       //reject action
  //     }
  //   });
  // }

}
