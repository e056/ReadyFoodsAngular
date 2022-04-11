import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIngredientsDetailsComponent } from './view-ingredients-details.component';

describe('ViewIngredientsDetailsComponent', () => {
  let component: ViewIngredientsDetailsComponent;
  let fixture: ComponentFixture<ViewIngredientsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIngredientsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIngredientsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
