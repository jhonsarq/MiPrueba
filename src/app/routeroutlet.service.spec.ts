import { TestBed } from '@angular/core/testing';

import { RouteroutletService } from './routeroutlet.service';

describe('RouteroutletService', () => {
  let service: RouteroutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteroutletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
