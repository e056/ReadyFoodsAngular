import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewIngredientComponent } from './create-new-ingredient.component';

describe('CreateNewIngredientComponent', () => {
  let component: CreateNewIngredientComponent;
  let fixture: ComponentFixture<CreateNewIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
