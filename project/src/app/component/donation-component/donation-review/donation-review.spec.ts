import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationReview } from './donation-review';

describe('DonationReview', () => {
  let component: DonationReview;
  let fixture: ComponentFixture<DonationReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
