import { TestBed } from '@angular/core/testing';

import { WsAdministratorService } from './ws-administrator.service';

describe('WsAdministratorService', () => {
  let service: WsAdministratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsAdministratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
