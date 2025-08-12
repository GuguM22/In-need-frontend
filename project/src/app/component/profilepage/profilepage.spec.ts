import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepageComponent } from './profilepage';

describe('Profilepage', () => {
  let component: ProfilepageComponent;
  let fixture: ComponentFixture<ProfilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
