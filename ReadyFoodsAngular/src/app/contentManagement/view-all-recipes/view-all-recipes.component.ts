import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientSpecification } from 'src/app/models/ingredient-specification';
import { Recipe } from 'src/app/models/recipe';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { SessionService } from 'src/app/services/session.service';
import { CommentEntity } from 'src/app/models/comment-entity';
import { CommentService } from 'src/app/services/comment.service';
import { Message, MessageService,ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-view-all-recipes',
  templateUrl: './view-all-recipes.component.html',
  styleUrls: ['./view-all-recipes.component.css'],
  providers: [MessageService]
})
export class ViewAllRecipesComponent implements OnInit {

  categories: Category[];

  recipes: Recipe[];
  recipeToView: Recipe;

  submitted: Boolean;
  resultSuccess: Boolean;
  resultError: Boolean;
  message: string | undefined;
  display: Boolean;
  commentsA: CommentEntity[];
  recipeCategories: Category[];


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private commentService: CommentService,
    private messageService: MessageService) {

    this.categories = [];
    this.recipes = [];
    this.recipeToView = new Recipe();

    this.resultSuccess = false;
    this.resultError = false;
    this.submitted = false;

    this.display = false;

    this.commentsA = new Array();
    this.recipeCategories = new Array();



  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.recipeService.getAllRecipes().subscribe({
      next: (response) => {
        this.recipes = response;
      },
      error: (error) => {
        console.log('********** ViewAllRecipes.ts: ' + error);
      }
    });

    this.categoryService.getParentCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log('********** ViewAllParentCategories.ts: ' + error);
      },
    });
  }

  showDialog(recipe:Recipe):void{
    console.log('********** show dialoggggggggggggggg')
    this.recipeToView = recipe;
    this.commentService.getCommentsForRecipe(this.recipeToView.recipeId).subscribe({
      next: (response) => {
        this.commentsA = response;
        this.display = true;
        for(let c of this.commentsA){
          console.log('********** COMMENTTTTTTT: ' + c.commentEntityId)
        }
        console.log('********** ViewAllRecipeComponent.ts: ' + this.commentsA)
      },
      error: (error) => {
        console.log('********** ViewAllReviewsComponent.ts: ' + error);
      }
    });
    console.log('********** running viewAllRecipe: Delete Comment')



  }
  deleteComment(commentDelete: CommentEntity){

    console.log('********** running viewAllRecipe: Delete Comment')
    console.log('mooooooooooooooooooooooooooooooooooooo' + this.recipeToView.recipeId)

    this.commentService.deleteComment(commentDelete.commentEntityId,this.recipeToView.recipeId).subscribe({
      next: (response) => {
        this.display = false;
        this.messageService.add({ severity: 'success', summary: 'Comment Deleted Successfully!', detail: "Comment Id: " + commentDelete.commentEntityId });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error occured with deleting comment', detail: error });

        console.log('********** ViewAllRecipeComponent.ts: ' + error);
      }

    })

  }

  recipeCategoryView(recipeId: number): Category[] {
    this.recipeService.getRecipeByRecipeId(recipeId).subscribe({
      next: (response) => {
        this.recipeToView = response;
      },
      error: (error) => {
        console.log('********** recipeToView.ts: ' + error);
      },
    });

    console.log('*********** test size' + this.recipeToView.categories == null);

    return this.recipeCategories = this.recipeToView.categories as Category[];

  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }
}
