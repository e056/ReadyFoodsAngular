import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { SessionService } from 'src/app/services/session.service';
import { Message, MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-view-parent-categories',
  templateUrl: './view-parent-categories.component.html',
  styleUrls: ['./view-parent-categories.component.css'],
  providers: [MessageService],
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
  categoriesWithoutDietType: Category[];

  submitted: Boolean;
  resultSuccess: Boolean;
  resultError: Boolean;
  message: string | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.categories = new Array();
    this.isParent = 0;
    this.name = '';
    this.newCategory = new Category();
    this.categoriesWithoutDietType = new Array();
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

    this.categoryService.getParentCategories().subscribe({
      next: (response) => {
        this.categoriesWithoutDietType = response;

        for (let i = 0; i < this.categoriesWithoutDietType.length; i++) {
          if (this.categoriesWithoutDietType[i].name == 'Diet Type') {
            let category = this.categoriesWithoutDietType.splice(i, i);
            console.log(category);
          }
        }
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
            this.messageService.add({
              severity: 'success',
              summary: 'Category created successfully!:',
              detail: this.message,
            });
            this.newCategory = new Category();
            this.selectedParentCategory = null;

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
    }
  }

  update(updateCategoryForm: NgForm) {
    this.submitted = true;

    if (updateCategoryForm.valid) {
      this.categoryService.updateCategory(this.categoryToUpdate).subscribe({
        next: (response) => {
          this.resultSuccess = true;
          this.resultError = false;
          this.message =
            'Category ' + this.categoryToUpdate.name + ' updated successfully';

          this.messageService.add({
            severity: 'success',
            summary: 'Category updated successfully!:',
            detail: this.message,
          });

          this.categoryToUpdate = new Category();

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

          updateCategoryForm.resetForm();
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
}
