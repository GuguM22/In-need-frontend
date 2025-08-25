import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from "../../ui/navbar/navbar";

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, NavbarComponent],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {

}
