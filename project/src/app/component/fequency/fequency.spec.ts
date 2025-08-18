import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fequency } from './fequency';

describe('Fequency', () => {
  let component: Fequency;
  let fixture: ComponentFixture<Fequency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fequency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fequency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
