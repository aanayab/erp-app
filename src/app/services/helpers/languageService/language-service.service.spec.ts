import { TestBed } from '@angular/testing';

import { LanguageServiceService } from './language-service.service';

describe('LanguageServiceService', () => {
  let service: LanguageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
