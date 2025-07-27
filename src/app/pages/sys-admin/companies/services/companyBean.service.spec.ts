import { TestBed } from '@angular/testing';

import { CompanyBeanService } from './companyBean.service';

describe('CompanyService', () => {
  let service: CompanyBeanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyBeanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
