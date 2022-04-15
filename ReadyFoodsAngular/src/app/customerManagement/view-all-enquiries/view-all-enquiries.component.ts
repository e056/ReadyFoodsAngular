import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
import { NgForm } from '@angular/forms';

import { Customer } from 'src/app/models/customer';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { SessionService } from 'src/app/services/session.service';
import { Message, MessageService,ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-view-all-enquiries',
  templateUrl: './view-all-enquiries.component.html',
  styleUrls: ['./view-all-enquiries.component.css'],
  providers: [MessageService]
})
export class ViewAllEnquiriesComponent implements OnInit {

  enquiries: Enquiry[];

  display: boolean

  submitted: boolean;

  enquiryToView: Enquiry;
  response: string;
  resolved: boolean | undefined | null;

  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;



  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private enquiryService: EnquiryService,
    private messageService: MessageService) {
    this.enquiries = new Array();

    this.display = false;
    this.enquiryToView = new Enquiry();
    this.submitted = false;

    this.response = "";
    this.resolved = null;


    this.resultSuccess = false;
    this.resultError = false;


  }


  ngOnInit(): void {
    this.checkAccessRight();
    console.log('********** ViewAllProductsComponent.ts: ' + "init");
    this.retrieveEnquiries();

  }

  retrieveEnquiries() {
    this.enquiryService.getEnquires().subscribe({
      next: (response) => {
        this.enquiries = response;
        console.log('********** ViewAllProductsComponent.ts: ' + this.enquiries)
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


  update(updateEnquiryForm: NgForm) {
    console.log('********** running updateEnquiryForm' + this.response)
    this.submitted = true;
    if (updateEnquiryForm.valid) {

      console.log('********** Form is valid')

      this.enquiryService.updateEnquiry(this.enquiryToView, this.response, null).subscribe({
        next: (response) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "ID: " + this.enquiryToView.enquiryId;
          this.messageService.add({severity:'success', 
          summary:'Staff response added successfully:', detail: this.message});
          this.retrieveEnquiries();
       
          
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

  resolve(updateEnquiryForm: NgForm) {
    console.log('********** running resolve' + this.response)
    this.submitted = true;
    if (updateEnquiryForm.valid) {

      console.log('********** Form is valid *******')

      this.enquiryService.updateEnquiry(this.enquiryToView, null, true).subscribe({
        next: (response) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "ID: " + this.enquiryToView.enquiryId;
          this.messageService.add({severity:'success', 
          summary:'Resolved successfully:', detail: this.message});
          this.retrieveEnquiries();
       
          
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while updating the enquiry: " + error;

          console.log('********** view-all-enquires.ts: ' + error);
        }
      });
    }

  }

  showDialog(en: Enquiry) {
    this.display = true;
    this.enquiryToView = en;
    this.enquiryToView.customer = en.customer;
  }




}
