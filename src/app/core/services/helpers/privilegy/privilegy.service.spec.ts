import { TestBed } from '@angular/core/testing';

import { PrivilegyService } from './privilegy.service';

describe('PrivilegyService', () => {
  let service: PrivilegyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivilegyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
