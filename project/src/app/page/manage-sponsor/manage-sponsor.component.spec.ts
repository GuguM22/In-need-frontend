import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSponsorComponent } from './manage-sponsor.component';

describe('ManageSponsorComponent', () => {
  let component: ManageSponsorComponent;
  let fixture: ComponentFixture<ManageSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSponsorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
