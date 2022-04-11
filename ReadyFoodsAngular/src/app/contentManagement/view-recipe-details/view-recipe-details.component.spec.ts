import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipeDetailsComponent } from './view-recipe-details.component';

describe('ViewRecipeDetailsComponent', () => {
  let component: ViewRecipeDetailsComponent;
  let fixture: ComponentFixture<ViewRecipeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecipeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
