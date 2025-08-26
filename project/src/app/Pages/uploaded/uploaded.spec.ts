import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploaded } from './uploaded';

describe('Uploaded', () => {
  let component: Uploaded;
  let fixture: ComponentFixture<Uploaded>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uploaded]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uploaded);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
