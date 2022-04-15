import { CreateStaffReq } from './../models/create-staff-req';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Staff } from '../models/staff';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  baseUrl: string = "/api/Staff"

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {
  }

  staffLogin(username: string | undefined, password: string | undefined): Observable<Staff>
	{
		return this.httpClient.get<Staff>(this.baseUrl + "/staffLogin?username=" + username + "&password=" + password).pipe
		(
			catchError(this.handleError)
		);
	}

  createNewStaff(newStaff: Staff): Observable<any>{
    console.log('********** CreateNewStaffService.ts: ' + this.sessionService.getUsername() + this.sessionService.getPassword());
    console.log('********** CreateNewStaffService.ts: ' + newStaff.firstName + newStaff.lastName + newStaff.username + newStaff.staffType + newStaff.password);
    let createStaffReq: CreateStaffReq = new CreateStaffReq(this.sessionService.getUsername(), this.sessionService.getPassword(), newStaff);
    return this.httpClient.put<any>(this.baseUrl + "/createStaff", createStaffReq, httpOptions).pipe
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
