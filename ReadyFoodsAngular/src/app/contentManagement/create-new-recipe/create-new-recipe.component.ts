import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientSpecification } from 'src/app/models/ingredient-specification';
import { Recipe } from 'src/app/models/recipe';
import { CategoryService } from 'src/app/services/category.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-create-new-recipe',
  templateUrl: './create-new-recipe.component.html',
  styleUrls: ['./create-new-recipe.component.css']
})
export class CreateNewRecipeComponent implements OnInit {

  recipeToView: Recipe;
  parentCategories: Category[];
  subCategories: Category[];

  ingredients: Ingredient[];
  ingredientSpecifications: IngredientSpecification[];
  ingredientSpecificationIds: number[];
  newRecipe: Recipe;

  submitted: Boolean;
  resultSuccess: Boolean;
  resultError: Boolean;
  message: string | undefined;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,

  ) {
    this.recipeToView = new Recipe();
    this.parentCategories = [];
    this.subCategories = [];
    this.ingredients = [];
    this.ingredientSpecifications = [];
    this.ingredientSpecificationIds = [];
    this.newRecipe = new Recipe();

    this.resultSuccess = false;
    this.resultError = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.categoryService.getParentCategories().subscribe({
      next: (response) => {
        this.parentCategories = response;
      },
      error: (error) => {
        console.log('********** ViewAllParentCategories.ts: ' + error);
      },
    });

    this.categoryService.getSubCategories().subscribe({
      next: (response) => {
        this.subCategories = response;
      },
      error: (error) => {
        console.log('********** ViewAllSubCategories.ts: ' + error);
      },
    });

    this.ingredientService.getIngredients().subscribe({
      next: (response) => {
        this.ingredients = response;
      },
      error: (error) => {
        console.log('********** ViewAllIngredients.ts: ' + error);
      },
    });
  }

  //creation of ingreSpec and recipe methods
  //empty for now, but planning to iterate and loop through the ingre spec list 
  //and create it before returning it as id to the list of ingre spec id list
  createIngredientSpecification(createIngredientSpecificationForm: NgForm) { }

  createRecipe(createRecipeForm: NgForm) {
    if (createRecipeForm.valid) {
      this.recipeService.createRecipe(this.newRecipe, this.ingredientSpecificationIds).subscribe({
        next: (response) => {
          let newRecipeId: number = response;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New Recipe " + this.newRecipe.recipeTitle + " created successfully!";

          this.newRecipe = new Recipe();
          this.ingredientSpecificationIds = [];
          this.ingredientSpecifications = [];
          createRecipeForm.resetForm();
          createRecipeForm.reset();
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new Recipe: " + error;

          console.log('********** CreateNewRecipeComponent.ts: ' + error);
        }
      });
    }
  }


  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

}
