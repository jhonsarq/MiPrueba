import { TestBed } from '@angular/core/testing';

import { ParentrouteroutletService } from './parentrouteroutlet.service';

describe('ParentrouteroutletService', () => {
  let service: ParentrouteroutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentrouteroutletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
