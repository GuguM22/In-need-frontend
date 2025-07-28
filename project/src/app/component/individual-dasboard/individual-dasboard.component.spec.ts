import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualDasboardComponent } from './individual-dasboard.component';

describe('IndividualDasboardComponent', () => {
  let component: IndividualDasboardComponent;
  let fixture: ComponentFixture<IndividualDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualDasboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
