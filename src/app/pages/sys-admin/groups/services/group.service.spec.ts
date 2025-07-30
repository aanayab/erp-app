import { TestBed } from '@angular/testing';

import { AuthorityService } from './group.service';

describe('AuthorityService', () => {
  let service: AuthorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
