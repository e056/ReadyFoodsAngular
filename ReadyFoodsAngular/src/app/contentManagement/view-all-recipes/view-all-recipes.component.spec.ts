import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRecipesComponent } from './view-all-recipes.component';

describe('ViewAllRecipesComponent', () => {
  let component: ViewAllRecipesComponent;
  let fixture: ComponentFixture<ViewAllRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllRecipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
