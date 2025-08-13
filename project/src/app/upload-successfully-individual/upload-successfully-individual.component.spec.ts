import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSuccessfullyindividualComponent  } from './upload-successfully-individual.component';

describe('SignInIndividualComponent', () => {
  let component: UploadSuccessfullyindividualComponent;
  let fixture: ComponentFixture<UploadSuccessfullyindividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadSuccessfullyindividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSuccessfullyindividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
