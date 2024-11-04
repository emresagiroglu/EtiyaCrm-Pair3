import { TestBed } from '@angular/core/testing';

import { CustomerCncService } from './customer-cnc.service';

describe('CustomerCncService', () => {
  let service: CustomerCncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
