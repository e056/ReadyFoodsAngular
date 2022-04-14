import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
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

  enquiryToView: Enquiry;

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

  showDialog(en: Enquiry) {
    this.display = true;
    this.enquiryToView = en;
    console.log(en.customer?.firstName)
    this.enquiryToView.customer = en.customer;
  }


}
