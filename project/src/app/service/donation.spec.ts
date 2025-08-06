import { TestBed } from '@angular/core/testing';

import { Donation } from './donation';

describe('Donation', () => {
  let service: Donation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Donation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
