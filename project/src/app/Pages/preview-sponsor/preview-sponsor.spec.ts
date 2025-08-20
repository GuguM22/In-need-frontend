import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSponsor } from './preview-sponsor';

describe('PreviewSponsor', () => {
  let component: PreviewSponsor;
  let fixture: ComponentFixture<PreviewSponsor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSponsor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewSponsor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
