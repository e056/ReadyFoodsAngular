import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllSubscriptionOrdersComponent } from './view-all-subscription-orders.component';

describe('ViewAllSubscriptionOrdersComponent', () => {
  let component: ViewAllSubscriptionOrdersComponent;
  let fixture: ComponentFixture<ViewAllSubscriptionOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllSubscriptionOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllSubscriptionOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
