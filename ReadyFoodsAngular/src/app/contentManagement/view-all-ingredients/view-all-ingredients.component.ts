import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService, ConfirmationService } from 'primeng/api';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientUnit } from 'src/app/models/ingredient-unit';
import { IngredientService } from 'src/app/services/ingredient.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-view-all-ingredients',
  templateUrl: './view-all-ingredients.component.html',
  styleUrls: ['./view-all-ingredients.component.css'],
  providers: [MessageService],
})
export class ViewAllIngredientsComponent implements OnInit {
  ingredients: Ingredient[];

  displayUpdateDetails: Boolean = false;

  submitted: Boolean;
  resultSuccess: Boolean;
  resultError: Boolean;
  message: string | undefined;
  ingredientUnits: any[];

  ingredientToUpdate: Ingredient;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private ingredientService: IngredientService,
    private messageService: MessageService
  ) {
    this.ingredients = new Array();
    this.submitted = false;
    this.resultError = false;
    this.resultSuccess = false;
    this.ingredientToUpdate = new Ingredient();
    this.ingredientUnits = Object.keys(IngredientUnit);
  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.ingredientService.getIngredients().subscribe({
      next: (response) => {
        this.ingredients = response;
        console.log(this.ingredients);
      },
      error: (error) => {
        console.log('********** ViewAllIngredients.ts: ' + error);
      },
    });
  }

  clear() {
    this.submitted = false;
    this.ingredientToUpdate = new Ingredient();
  }

  showDialogUpdateDetails(ingredientToUpdate: Ingredient) {
    this.displayUpdateDetails = true;
    this.ingredientToUpdate = ingredientToUpdate;
  }

  update(updateIngredientForm: NgForm) {
    this.submitted = true;
    if (updateIngredientForm.valid) {
      this.ingredientService
        .updateIngredient(this.ingredientToUpdate)
        .subscribe({
          next: (response) => {
            this.resultError = false;
            this.resultSuccess = true;
            this.message =
              'Ingredient ' +
              this.ingredientToUpdate.name +
              ' updated successfully';
            this.messageService.add({
              severity: 'success',
              summary: 'Ingredient updated successfully: ',
              detail: this.message,
            });

            this.ingredientToUpdate = new Ingredient();
            this.ingredientService.getIngredients().subscribe({
              next: (response) => {
                this.ingredients = response;
                console.log(this.ingredients);
              },
              error: (error) => {
                console.log('********** ViewAllIngredients.ts: ' + error);
              },
            });

            updateIngredientForm.resetForm();
          },
          error: (error) => {
            this.resultError = true;
            this.resultSuccess = false;
            this.message =
              'An error has occurred while updating the category: ' + error;

            console.log('********** UpdateCategoryComponent.ts: ' + error);
          },
        });
    }
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }
}
