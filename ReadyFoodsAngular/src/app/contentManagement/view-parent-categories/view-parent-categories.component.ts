import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private categoryService: CategoryService
  ) {
    this.categories = new Array();
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
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }
}
