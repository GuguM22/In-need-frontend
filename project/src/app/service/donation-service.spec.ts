import { TestBed } from '@angular/core/testing';

import { DonationService } from './donation-service';

describe('Donation', () => {
  let service: DonationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
