import { TestBed } from '@angular/core/testing';

import { CustomerDeleteService } from './customer-delete.service';

describe('CustomerDeleteService', () => {
  let service: CustomerDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
