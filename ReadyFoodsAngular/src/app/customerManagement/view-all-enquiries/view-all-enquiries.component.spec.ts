import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllEnquiriesComponent } from './view-all-enquiries.component';

describe('ViewAllEnquiriesComponent', () => {
  let component: ViewAllEnquiriesComponent;
  let fixture: ComponentFixture<ViewAllEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllEnquiriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
