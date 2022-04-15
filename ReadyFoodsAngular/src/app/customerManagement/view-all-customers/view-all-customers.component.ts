import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
import { NgForm } from '@angular/forms';

import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';
import { Message, MessageService,ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-view-all-customers',
  templateUrl: './view-all-customers.component.html',
  styleUrls: ['./view-all-customers.component.css'],
  providers: [MessageService]
})
export class ViewAllCustomersComponent implements OnInit {
  customers: Customer[]

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private customerService: CustomerService,
    private messageService: MessageService) {
    this.customers = new Array();
   }



  ngOnInit(): void {
    this.checkAccessRight()
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

}
