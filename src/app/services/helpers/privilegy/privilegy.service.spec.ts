import { TestBed } from '@angular/testing';

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
