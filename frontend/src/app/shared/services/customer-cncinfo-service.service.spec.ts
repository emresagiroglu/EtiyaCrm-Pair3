import { TestBed } from '@angular/core/testing';

import { CustomerCncinfoServiceService } from './customer-service/customer-cncinfo.service';

describe('CustomerCncinfoServiceService', () => {
  let service: CustomerCncinfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCncinfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
