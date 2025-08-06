import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReq } from './review-req';

describe('ReviewReq', () => {
  let component: ReviewReq;
  let fixture: ComponentFixture<ReviewReq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewReq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewReq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
