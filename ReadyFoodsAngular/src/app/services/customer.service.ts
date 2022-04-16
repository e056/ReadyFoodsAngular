import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { SessionService } from '../services/session.service';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl: string = "/api/Customer";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {
  }

  
  getEnquires(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(
      this.baseUrl + "/retrieveAllCustomers?username="
      + this.sessionService.getUsername()
      + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
  }

  banCustomer(customerId : number) {
    return this.httpClient.get<any>(
      this.baseUrl + "/banCustomer/" + customerId + "?username="
      + this.sessionService.getUsername()
      + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
  }

  unbanCustomer(customerId : number) {
    return this.httpClient.get<any>(
      this.baseUrl + "/unbanCustomer/" + customerId + "?username="
      + this.sessionService.getUsername()
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
