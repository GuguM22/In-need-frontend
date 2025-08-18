import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationRequest } from './donation-request';

describe('DonationRequest', () => {
  let component: DonationRequest;
  let fixture: ComponentFixture<DonationRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
