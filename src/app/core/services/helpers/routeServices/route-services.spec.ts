import { TestBed } from '@angular/core/testing';

import { RouteService } from './route-services';

describe('RouteServicesService', () => {
  let service: RouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
