import { TestBed } from '@angular/core/testing';

import { SponsorRequestService } from './sponsor-request-service';

describe('SponsorRequestService', () => {
  let service: SponsorRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsorRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
