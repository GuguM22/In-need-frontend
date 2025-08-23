import { TestBed } from '@angular/core/testing';

import { DonationStateService } from './donation-state-service';

describe('DonationStateService', () => {
  let service: DonationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
