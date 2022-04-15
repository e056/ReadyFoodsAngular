import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreateIngredientReq } from '../models/create-ingredient-req';
import { Ingredient } from '../models/ingredient';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  baseUrl: string = "/api/Ingredient";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.baseUrl + "/retrieveAllIngredients?username=" + this.sessionService.getUsername() + "&password?=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
  }

  getIngredient(ingredientId: number): Observable<Ingredient> {

    return this.httpClient.get<Ingredient>(this.baseUrl + "/retrieveIngredient/" + ingredientId + "?username=" + this.sessionService.getUsername() + "&password?=" + this.sessionService.getPassword()).pipe
      (
        catchError(this.handleError)
      );
  }

  createNewIngredient(newIngredient: Ingredient): Observable<number> {
    let createIngredientReq: CreateIngredientReq = new CreateIngredientReq(this.sessionService.getUsername(), this.sessionService.getPassword(), newIngredient);

    return this.httpClient.put<number>(this.baseUrl, createIngredientReq, httpOptions).pipe
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
