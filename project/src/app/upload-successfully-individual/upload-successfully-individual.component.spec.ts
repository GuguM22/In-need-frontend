import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInIndividualComponent } from './upload-successfully-individual.component';

describe('SignInIndividualComponent', () => {
  let component: SignInIndividualComponent;
  let fixture: ComponentFixture<SignInIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
