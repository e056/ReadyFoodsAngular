import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
import { NgForm } from '@angular/forms';
import { Status } from 'src/app/models/status';
import { Table } from 'primeng/table';

import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { SessionService } from 'src/app/services/session.service';
import { Message, MessageService, ConfirmationService } from 'primeng/api';



@Component({
  selector: 'app-view-all-subscriptions',
  templateUrl: './view-all-subscriptions.component.html',
  styleUrls: ['./view-all-subscriptions.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewAllSubscriptionsComponent implements OnInit {

  subscriptions: Subscription[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private subscriptionService: SubscriptionService,
    private messageService: MessageService) {
      this.subscriptions = new Array();

     }

  ngOnInit(): void {
    this.checkAccessRight();
    this.retrieveSubscriptions();
  }

  retrieveSubscriptions() {
    console.log('********** ViewAllSubs.ts: ' + "init");
    this.subscriptionService.getSubscriptions().subscribe({
      next: (response) => {
        console.log('********** ViewAllSubs.ts: ' + "init");
        this.subscriptions = response;
        console.log(this.subscriptions);

      },
      error: (error) => {
        console.log('********** ViewAllSubs.ts: ' + error);
      }
    });
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

  clear(table: Table) {
    table.clear();
  }


}
