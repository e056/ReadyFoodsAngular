import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllIngredientsComponent } from './view-all-ingredients.component';

describe('ViewAllIngredientsComponent', () => {
  let component: ViewAllIngredientsComponent;
  let fixture: ComponentFixture<ViewAllIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllIngredientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
