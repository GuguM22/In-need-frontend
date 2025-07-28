import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorDasboardComponent } from './sponsor-dasboard.component';

describe('SponsorDasboardComponent', () => {
  let component: SponsorDasboardComponent;
  let fixture: ComponentFixture<SponsorDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorDasboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
