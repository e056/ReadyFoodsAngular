import { Review } from './../models/review';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl: string = "/api/Review"

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
  }
    getAllReviews():Observable<Review[]> {
      return this.httpClient.get<Review[]>(
        this.baseUrl + "/retrieveAllReviews?username="
        + this.sessionService.getUsername()
        + "&password=" + this.sessionService.getPassword()).pipe
        (
          catchError(this.handleError)
        );

     }

     deleteReview(reviewId:number | undefined): Observable<any>{
      return this.httpClient.get<any>(this.baseUrl
        + "/deleteReview/" + reviewId
        + "?username=" + this.sessionService.getUsername()
        + "&password=" + this.sessionService.getPassword()).pipe
        (
          catchError(this.handleError)
        );
    }



     private handleError(error: HttpErrorResponse) {
      let errorMessage: string = "";

      if (error.error instanceof ErrorEvent) {
        errorMessage = "An unknown error has occurred: " + error.error;
      }
      else {
        errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
      }

      console.error(errorMessage);

      return throwError(() => new Error(errorMessage));
    }

}
