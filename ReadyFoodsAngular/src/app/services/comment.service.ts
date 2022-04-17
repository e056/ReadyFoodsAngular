import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommentEntity } from '../models/comment-entity';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl: string = "/api/Comment"

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {

   }

   deleteComment(commentId:number | undefined,recipeId:number | undefined): Observable<any>{
     
    return this.httpClient.get<any>(this.baseUrl
      + "/deleteComment/" + commentId
      + "?username=" + this.sessionService.getUsername()
      + "&password=" + this.sessionService.getPassword() +"&recipeId=" + recipeId).pipe
      (
        catchError(this.handleError)
      );
  }

  getCommentsForRecipe(recipeId:number | undefined):Observable<CommentEntity[]>{
    return this.httpClient.get<CommentEntity[]>(
      this.baseUrl + "/retrieveCommentsForRecipe/" + recipeId + "?username="
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
