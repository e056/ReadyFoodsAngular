import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { OrderEntity } from '../models/order-entity';
import { UpdateOrderReq } from '../models/update-order-req';
import { SessionService } from './session.service';

import { Status } from '../models/status';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class OrderEntityService {

  baseUrl: string = "/api/OrderEntity"

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
   }

   getAllOrders():Observable<OrderEntity[]> {
    return this.httpClient.get<OrderEntity[]>(
      this.baseUrl + "/retrieveAllOrders?username="
      + this.sessionService.getUsername()
      + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
   }

   getAllSubscriptionOrders():Observable<OrderEntity[]> {
    return this.httpClient.get<OrderEntity[]>(
      this.baseUrl + "/retrieveAllSubscriptionOrders?username="
      + this.sessionService.getUsername()
      + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );

   }

   processAllSubscriptionOrders():Observable<OrderEntity[]> {
    return this.httpClient.get<OrderEntity[]>(
      this.baseUrl + "/processAllSubscriptionOrders?username="
      + this.sessionService.getUsername()
      + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );

   }

   updateOrder(orderToUpdate: OrderEntity,  newStatus: Status): Observable<any> {
    let updateOrderReq: UpdateOrderReq = new UpdateOrderReq(
      this.sessionService.getUsername(),
      this.sessionService.getPassword(),
      orderToUpdate, newStatus
    );

    return this.httpClient
      .post<any>(this.baseUrl, updateOrderReq, httpOptions)
      .pipe(catchError(this.handleError));
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
