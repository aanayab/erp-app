import { TestBed } from '@angular/testing';

import { WsAuthenticateService } from './ws-authenticate.service';

describe('WsAuthenticateService', () => {
  let service: WsAuthenticateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsAuthenticateService);

    service.getToken("aanayab","12345678");
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



});
