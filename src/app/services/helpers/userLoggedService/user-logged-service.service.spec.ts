import { TestBed } from '@angular/testing';

import { UserLoggedServiceService } from './user-logged-service.service';

describe('SerLoggedServiceService', () => {
  let service: UserLoggedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoggedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
