import { TestBed } from '@angular/core/testing';

import { WsSysAdminService } from './ws-sys-admin.service';

describe('WsSysAdminService', () => {
  let service: WsSysAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsSysAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
