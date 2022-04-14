import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { SessionService } from '../services/session.service';
import { Enquiry } from '../models/enquiry';
import { UpdateEnquiryReq } from '../models/update-enquiry-req';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  baseUrl: string = "/api/Enquiry";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {
  }

  getEnquires(): Observable<Enquiry[]> {
    return this.httpClient.get<Enquiry[]>(
      this.baseUrl + "/retrieveAllEnquiries?username="
      + this.sessionService.getUsername()
      + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
  }

  getEnquiryByEnquiryId(enquiryId: number): Observable<Enquiry> {
    return this.httpClient.get<Enquiry>(this.baseUrl
      + "/retrieveEnquiry/" + enquiryId
      + "?username=" + this.sessionService.getUsername()
      + "&password=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
  }

  updateEnquiry(enquiryToUpdate: Enquiry, response: string | undefined, resolved: boolean | undefined | null): Observable<any> {
    
    let updateEnquiryReq: UpdateEnquiryReq = new
    UpdateEnquiryReq(this.sessionService.getUsername(),
        this.sessionService.getPassword(), enquiryToUpdate, response, resolved);

    console.log(updateEnquiryReq)

    return this.httpClient.post<any>(this.baseUrl, updateEnquiryReq, httpOptions).pipe
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


