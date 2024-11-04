import { TestBed } from '@angular/core/testing';

import { CustomerIdService } from './customer-id.service';

describe('CustomerIdService', () => {
  let service: CustomerIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
