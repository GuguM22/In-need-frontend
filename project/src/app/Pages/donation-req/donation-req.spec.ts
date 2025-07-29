import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationReq } from './donation-req';

describe('DonationReq', () => {
  let component: DonationReq;
  let fixture: ComponentFixture<DonationReq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationReq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationReq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
