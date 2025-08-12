import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipRequestPage } from './sponsorship-request-page';

describe('SponsorshipRequestPage', () => {
  let component: SponsorshipRequestPage;
  let fixture: ComponentFixture<SponsorshipRequestPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorshipRequestPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorshipRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
