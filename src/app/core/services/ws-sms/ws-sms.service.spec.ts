import { TestBed } from '@angular/core/testing';

import { WsSmsService } from './ws-sms.service';

describe('WsSmsService', () => {
  let service: WsSmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsSmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
