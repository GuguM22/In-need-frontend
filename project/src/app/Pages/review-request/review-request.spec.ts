import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRequest } from './review-request';

describe('ReviewRequest', () => {
  let component: ReviewRequest;
  let fixture: ComponentFixture<ReviewRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
