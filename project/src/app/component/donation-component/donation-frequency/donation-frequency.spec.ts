import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationFrequency } from './donation-frequency';

describe('DonationFrequency', () => {
  let component: DonationFrequency;
  let fixture: ComponentFixture<DonationFrequency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationFrequency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationFrequency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
