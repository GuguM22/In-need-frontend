import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this import
import { Fequency } from './fequency';
import { NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";

describe('Fequency', () => {
  let component: Fequency;
  let fixture: ComponentFixture<Fequency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, // Add FormsModule here
        Fequency,    // This is your standalone component
        NavbarComponent,      // Import its dependencies
        FooterComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fequency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests here
  it('should initialize with no selected frequency', () => {
    expect(component.selectedFrequency).toBe('');
  });

  it('should have four frequency options', () => {
    expect(component.frequencyTiles.length).toBe(4);
  });
});