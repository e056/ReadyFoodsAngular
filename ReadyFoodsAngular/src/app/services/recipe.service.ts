import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Recipe } from '../models/recipe';
import { IngredientSpecification } from '../models/ingredient-specification';
import { CreateIngredientSpecificationReq } from '../models/create-ingredient-specification-req';
import { CreateRecipeReq } from '../models/create-recipe-req';

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
  ) { }

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

  createIngredientSpecification(ingredientSpecification: IngredientSpecification): Observable<number> {
    let createIngredientSpecificationReq: CreateIngredientSpecificationReq = new CreateIngredientSpecificationReq(
      this.sessionService.getUsername(), this.sessionService.getPassword(), 
      ingredientSpecification,
    );
    return this.httpClient
      .put<number>("/api/IngredientSpecification", createIngredientSpecificationReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createRecipe(recipe: Recipe, categoryIds: number[], ingredientSpecificationIds: number[]): Observable<number> {
    let createRecipeReq: CreateRecipeReq = new CreateRecipeReq(
      this.sessionService.getUsername(), this.sessionService.getPassword(),
      recipe, categoryIds, ingredientSpecificationIds
    );
    return this.httpClient
      .put<number>(this.baseUrl, createRecipeReq, httpOptions)
      .pipe(catchError(this.handleError));
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
