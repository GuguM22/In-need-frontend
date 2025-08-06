import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationPage } from './verification-page';

describe('VerificationPage', () => {
  let component: VerificationPage;
  let fixture: ComponentFixture<VerificationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
