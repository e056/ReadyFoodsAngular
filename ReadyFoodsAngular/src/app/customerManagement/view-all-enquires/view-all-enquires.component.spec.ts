import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllEnquiresComponent } from './view-all-enquires.component';

describe('ViewAllEnquiresComponent', () => {
  let component: ViewAllEnquiresComponent;
  let fixture: ComponentFixture<ViewAllEnquiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllEnquiresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllEnquiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
