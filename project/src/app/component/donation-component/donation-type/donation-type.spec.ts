import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationType } from './donation-type';

describe('DonationType', () => {
  let component: DonationType;
  let fixture: ComponentFixture<DonationType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
