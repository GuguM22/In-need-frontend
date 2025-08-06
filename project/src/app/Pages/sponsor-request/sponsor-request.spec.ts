import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorRequest } from './sponsor-request';

describe('SponsorRequest', () => {
  let component: SponsorRequest;
  let fixture: ComponentFixture<SponsorRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
