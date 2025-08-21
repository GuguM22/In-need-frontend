import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewIndividual } from './preview-individual';

describe('PreviewIndividual', () => {
  let component: PreviewIndividual;
  let fixture: ComponentFixture<PreviewIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewIndividual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewIndividual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
