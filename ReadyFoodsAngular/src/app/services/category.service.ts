import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { Category } from '../models/category';
import { CreateCategoryReq } from '../models/create-category-req';
import { UpdateCategoryReq } from '../models/update-category-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl: string = '/api/Category';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getParentCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(
        this.baseUrl +
          '/retrieveAllParentCategories?username=' +
          this.sessionService.getUsername() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  getSubCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(
        this.baseUrl +
          '/retrieveAllLeafCategories?username=' +
          this.sessionService.getUsername() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  getDietSubCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(
        this.baseUrl +
          '/retrieveDietCategories?username=' +
          this.sessionService.getUsername() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  getNonDietSubCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(
        this.baseUrl +
          '/retrieveNonDietCategories?username=' +
          this.sessionService.getUsername() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  createCategory(
    newCategory: Category,
    parentId: number | null | undefined
  ): Observable<number> {
    let createProductReq: CreateCategoryReq = new CreateCategoryReq(
      this.sessionService.getUsername(),
      this.sessionService.getPassword(),
      newCategory,
      parentId
    );
    return this.httpClient
      .put<number>(this.baseUrl, createProductReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateCategory(categoryToUpdate: Category): Observable<number> {
    let updateCategoryReq: UpdateCategoryReq = new UpdateCategoryReq(
      this.sessionService.getUsername(),
      this.sessionService.getPassword(),
      categoryToUpdate
    );
    console.log('testttttttttttttttttttttttttt');
    return this.httpClient
      .post<number>(this.baseUrl, updateCategoryReq, httpOptions)
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
