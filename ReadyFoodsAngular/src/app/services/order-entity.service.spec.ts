import { TestBed } from '@angular/core/testing';

import { OrderEntityService } from './order-entity.service';

describe('OrderEntityService', () => {
  let service: OrderEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
