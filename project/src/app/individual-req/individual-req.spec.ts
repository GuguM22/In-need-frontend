import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualReq } from './individual-req';

describe('IndividualReq', () => {
  let component: IndividualReq;
  let fixture: ComponentFixture<IndividualReq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualReq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualReq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
