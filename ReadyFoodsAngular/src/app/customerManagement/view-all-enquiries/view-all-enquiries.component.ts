import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
import { NgForm } from '@angular/forms';

import { Customer } from 'src/app/models/customer';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-view-all-enquiries',
  templateUrl: './view-all-enquiries.component.html',
  styleUrls: ['./view-all-enquiries.component.css']
})
export class ViewAllEnquiriesComponent implements OnInit {

  enquiries: Enquiry[];

  statuses: any[];

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
    private enquiryService: EnquiryService) {
    this.enquiries = new Array();
    this.statuses = [
      { "Not Resolved": false },
      { "Resolved": true }
    ]
    this.display = false;
    this.enquiryToView = new Enquiry();
    this.submitted = false;

    this.response = "";
    this.resolved = null;


    this.resultSuccess = false;
    this.resultError = false;


  }


  ngOnInit(): void {
    console.log('********** ViewAllProductsComponent.ts: ' + "init");
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


  update(updateEnquiryForm: NgForm) {
    console.log('********** running updateEnquiryForm' + this.response)
    this.submitted = true;
    if (updateEnquiryForm.valid) {

      console.log('********** Form is valid')

      this.enquiryService.updateEnquiry(this.enquiryToView, this.response, this.resolved).subscribe({
        next: (response) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "Enquiry updated successfully";
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while updating the enquiry: " + error;

          console.log('********** UpdateProductComponent.ts: ' + error);
        }
      });
    }

  }
  showDialog(en: Enquiry) {
    this.display = true;
    this.enquiryToView = en;
    console.log(en.customer?.firstName)
    this.enquiryToView.customer = en.customer;
  }


}
