import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientSpecification } from 'src/app/models/ingredient-specification';
import { PreparationMethod } from 'src/app/models/preparation-method';
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

  selectedDiet: Category;
  dietCategories: Category[];
  nonDietCategories: Category[];
  selectedCategories: number[];
  preparationMethod: any[];

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
    this.selectedDiet = new Category(); //special cat selection
    this.dietCategories = new Array(); //for display
    this.nonDietCategories = new Array(); //for display

    this.selectedCategories = new Array(); //for selection during display and creation of recipe to be passed
    this.ingredients = new Array();
    this.ingredientSpecifications = new Array(); //during selection to display
    this.ingredientSpecificationIds = new Array(); //after creating ingrespec to store ids
    this.newRecipe = new Recipe();
    this.preparationMethod = Object.keys(PreparationMethod);

    this.resultSuccess = false;
    this.resultError = false;
    this.submitted = false;

  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.categoryService.getDietSubCategories().subscribe({
      next: (response) => {
        this.dietCategories = response;
        this.dietCategories.push(new Category(-1, "No Diet Type", "No Diet Type"));
        console.log(this.dietCategories);
      },
      error: (error) => {
        console.log('********** Diet Categories.ts: ' + error);
      },
    });

    this.categoryService.getNonDietSubCategories().subscribe({
      next: (response) => {
        this.nonDietCategories = response;
        console.log(this.nonDietCategories);
      },
      error: (error) => {
        console.log('********** Non Diet Categories.ts: ' + error);
      },
    });

      this.ingredientService.getIngredients().subscribe({
        next: (response) => {
          this.ingredients = response;
          for (var i = 0; i < this.ingredients.length; i++) {
            console.log("Retrieved name: " + this.ingredients[i].name)
            const tempIS: IngredientSpecification = new IngredientSpecification(-1, 0,
              PreparationMethod.Nil, this.ingredients[i]);
            this.addIs(tempIS);
          }
          console.log(this.ingredients);
        },
        error: (error) => {
          console.log('********** ViewAllIngredients.ts: ' + error);
        },
      });

  }

  //helper method to add retrieve ingredients into ingredientSpecifications
  addIs(is: IngredientSpecification) {
    this.ingredientSpecifications.push(is);
  }

  createRecipe(createRecipeForm: NgForm) {

    let confirmedIngredientSpecifications: IngredientSpecification[] = [];

    for(var i = 0 ; i < this.ingredientSpecifications.length; i++) {
      if(this.ingredientSpecifications[i].quantityPerServing != 0) {
        confirmedIngredientSpecifications.push(this.ingredientSpecifications[i]);
      }
    }

    console.log("Confirmed ingredient specification size  " + confirmedIngredientSpecifications.length);
    console.log("Sampling first element " + confirmedIngredientSpecifications[0].ingredient?.name);

    //to persist and create list of ingredient specifications first
    for(var i = 0 ; i < confirmedIngredientSpecifications.length; i++) {
      this.recipeService.createIngredientSpecification(confirmedIngredientSpecifications[0]).subscribe({
        next: (response) => {
          let newIngredientSpecificationId: number = response;
          this.ingredientSpecificationIds.push(newIngredientSpecificationId);
          this.resultSuccess = true;
          this.resultError = false;
          console.log("New ingredient specification for" + this.ingredientSpecifications[0].ingredient?.name + "created, ID: " + newIngredientSpecificationId)
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new ingredient specification: " + error;
          console.log('********** CreateNewISComponent.ts: ' + error);
        }
      });
    }

    //checking if theres any diet type selected
    if(this.selectedDiet.name != "No Diet Type") {
      this.selectedCategories.push(this.selectedDiet.categoryId as number);
    }

    //creation of recipe
    if (createRecipeForm.valid) {
      this.recipeService.createRecipe(this.newRecipe, this.selectedCategories, this.ingredientSpecificationIds).subscribe({
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
