import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Recipe } from '../models/recipe';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl: string = "/api/Recipe";

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.baseUrl + "/retrieveAllRecipes?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe
    (
      catchError(this.handleError)
    );
  } 

  getRecipeByRecipeId(recipeId: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(this.baseUrl + "/retrieveRecipe/" + recipeId + "?username=" + this.sessionService.getUsername() + "&password=" + this.sessionService.getPassword()).pipe
    (
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }

}
