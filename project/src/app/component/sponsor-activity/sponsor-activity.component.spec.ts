import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorActivityComponent } from './sponsor-activity.component';

describe('SponsorActivityComponent', () => {
  let component: SponsorActivityComponent;
  let fixture: ComponentFixture<SponsorActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
