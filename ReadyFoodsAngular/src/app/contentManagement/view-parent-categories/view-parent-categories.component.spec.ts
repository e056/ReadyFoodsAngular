import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParentCategoriesComponent } from './view-parent-categories.component';

describe('ViewParentCategoriesComponent', () => {
  let component: ViewParentCategoriesComponent;
  let fixture: ComponentFixture<ViewParentCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParentCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
