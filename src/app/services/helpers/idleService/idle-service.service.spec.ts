import { TestBed } from '@angular/testing';

import { IdleServiceService } from './idle-service.service';

describe('IdleServiceService', () => {
  let service: IdleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
