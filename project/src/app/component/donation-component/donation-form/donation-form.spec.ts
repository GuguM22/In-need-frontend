import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationForm } from './donation-form';

describe('DonationForm', () => {
  let component: DonationForm;
  let fixture: ComponentFixture<DonationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
