import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry } from 'src/app/models/enquiry';
import { NgForm } from '@angular/forms';
import { Review } from 'src/app/models/review';

import { Customer } from 'src/app/models/customer';
import { ReviewService } from 'src/app/services/review.service';
import { SessionService } from 'src/app/services/session.service';
import { Message, MessageService,ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-view-all-reviews',
  templateUrl: './view-all-reviews.component.html',
  styleUrls: ['./view-all-reviews.component.css'],
  providers: [MessageService]
})
export class ViewAllReviewsComponent implements OnInit {

  reviews: Review[];

  reviewToView: Review;

  display: boolean;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private reviewService: ReviewService,
    private messageService: MessageService) {
      this.reviews = new Array();
      this.reviewToView = new Review();
      this.display = false;
     }

  ngOnInit(): void {
    this.checkAccessRight();
    console.log('********** ViewAllProductsComponent.ts: ' + "init");
    this.retrieveReviews();
  }

  showDialog(review:Review):void{
    this.display = true;
    this.reviewToView = review;
    this.reviewToView.customer = review.customer;

  }

  retrieveReviews(){
    this.reviewService.getAllReviews().subscribe({
      next: (response) => {
        this.reviews = response;
        console.log('********** ViewAllReviewsComponent.ts: ' + this.reviews)
      },
      error: (error) => {
        console.log('********** ViewAllReviewsComponent.ts: ' + error);
      }
    });

  }

  deleteReview(){
    console.log('********** running viewAllReviewForm: Delete Review')
    this.reviewService.deleteReview(this.reviewToView.reviewId).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Review Deleted Successfully!', detail: "Review Id: " + this.reviewToView.reviewId });
        this.retrieveReviews();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error occured with deleting staff', detail: error });

        console.log('********** ViewAllReviewComponent.ts: ' + error);
      }

    })
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

}
