import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSponsorIndividualComponent } from './manage-sponsor-individual.component';

describe('ComponentManageSponsorIndividualComponent', () => {
  let component: ManageSponsorIndividualComponent;
  let fixture: ComponentFixture<ManageSponsorIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSponsorIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSponsorIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
