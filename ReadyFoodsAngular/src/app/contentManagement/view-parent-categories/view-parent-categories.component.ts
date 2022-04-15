import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-view-parent-categories',
  templateUrl: './view-parent-categories.component.html',
  styleUrls: ['./view-parent-categories.component.css'],
})
export class ViewParentCategoriesComponent implements OnInit {
  categories: Category[];
  isParent: Number;
  displaySub: boolean = false;
  displayParent: boolean = false;
  displayUpdateDetails: Boolean = false;
  displayViewDetails: Boolean = false;
  name: String;
  newCategory: Category;
  isSubBoolean: Boolean;
  categoriesSub: Category[];
  selectedParentCategory: Category | null;
  categoryToUpdate: Category;

  submitted: Boolean;
  resultSuccess: Boolean;
  resultError: Boolean;
  message: string | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private categoryService: CategoryService
  ) {
    this.categories = new Array();
    this.isParent = 0;
    this.name = '';
    this.newCategory = new Category();
    this.isSubBoolean = false;
    this.categoriesSub = new Array();
    this.selectedParentCategory = null;
    this.categoryToUpdate = new Category();

    this.resultSuccess = false;
    this.resultError = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.categoryService.getParentCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log('********** ViewAllParentCategories.ts: ' + error);
      },
    });

    this.categoryService.getSubCategories().subscribe({
      next: (response) => {
        this.categoriesSub = response;
      },
    });
  }

  changeToSub(): void {
    this.isParent = 1;
    this.isSubBoolean = true;
  }

  showDialogSub() {
    this.displaySub = true;
  }

  showDialogParent() {
    this.displayParent = true;
  }

  showDialogUpdateDetails(categoryToUpdate: Category) {
    this.categoryToUpdate = categoryToUpdate;
    this.displayUpdateDetails = true;
  }

  showDialogViewDetails(categoryToUpdate: Category) {
    this.categoryToUpdate = categoryToUpdate;
    this.displayViewDetails = true;
  }

  changeToParent(): void {
    this.isParent = 0;
    this.isSubBoolean = false;
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

  clear() {
    this.submitted = false;
    this.newCategory = new Category();
    this.selectedParentCategory = null;
  }

  create(createCategoryForm: NgForm) {
    this.submitted = true;
    if (createCategoryForm.valid) {
      this.categoryService
        .createCategory(
          this.newCategory,
          this.selectedParentCategory == null
            ? null
            : this.selectedParentCategory.categoryId
        )
        .subscribe({
          next: (response) => {
            let newCategoryId: number = response;
            this.resultSuccess = true;
            this.resultError = false;
            this.message =
              'New Category ' + this.newCategory.name + ' created successfully';

            this.newCategory = new Category();
            this.selectedParentCategory = null;

            createCategoryForm.resetForm();
          },
          error: (error) => {
            this.resultError = true;
            this.resultSuccess = false;
            this.message =
              'An error has occurred while creating the new product: ' + error;

            console.log('********** CreateNewProductComponent.ts: ' + error);
          },
        });
      //Update the parent and sub categories table
      this.categoryService.getParentCategories().subscribe({
        next: (response) => {
          this.categories = response;
        },
        error: (error) => {
          console.log('********** ViewAllParentCategories.ts: ' + error);
        },
      });

      this.categoryService.getSubCategories().subscribe({
        next: (response) => {
          this.categoriesSub = response;
        },
      });
    }
  }

  update(updateCategoryForm: NgForm) {
    this.submitted = true;

    if (updateCategoryForm.valid) {
      this.categoryService.updateCategory(this.categoryToUpdate).subscribe({
        next: (response) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.message = 'Category updated successfully';
          updateCategoryForm.resetForm();
          this.categoryToUpdate = new Category();
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message =
            'An error has occurred while updating the category: ' + error;

          console.log('********** UpdateCategoryComponent.ts: ' + error);
        },
      });

      //Update the parent and sub categories table
      this.categoryService.getParentCategories().subscribe({
        next: (response) => {
          this.categories = response.slice();
        },
        error: (error) => {
          console.log('********** ViewAllParentCategories.ts: ' + error);
        },
      });

      this.categoryService.getSubCategories().subscribe({
        next: (response) => {
          this.categoriesSub = response.slice();
        },
      });
    }
  }
}
