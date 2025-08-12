import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiseDetails } from './organise-details';

describe('OrganiseDetails', () => {
  let component: OrganiseDetails;
  let fixture: ComponentFixture<OrganiseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganiseDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganiseDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
