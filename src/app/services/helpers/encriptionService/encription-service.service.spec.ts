import { TestBed } from '@angular/testing';

import { EncriptionServiceService } from './encription-service.service';

describe('EncriptionServiceService', () => {
  let service: EncriptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncriptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
