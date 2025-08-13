import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentManageSponsorIndividualComponent } from './manage-sponsor-individual.component';

describe('ComponentManageSponsorIndividualComponent', () => {
  let component: ComponentManageSponsorIndividualComponent;
  let fixture: ComponentFixture<ComponentManageSponsorIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentManageSponsorIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentManageSponsorIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
