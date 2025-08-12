import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSuccessfullyComponent } from './upload-successfully.component';

describe('UploadSuccessfullyComponent', () => {
  let component: UploadSuccessfullyComponent;
  let fixture: ComponentFixture<UploadSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadSuccessfullyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
