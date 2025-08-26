import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSponsorOrganisationComponent } from './manage-sponsor-organisation.component';

describe('ManageSponsorOrganisationComponent', () => {
  let component: ManageSponsorOrganisationComponent;
  let fixture: ComponentFixture<ManageSponsorOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSponsorOrganisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSponsorOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
