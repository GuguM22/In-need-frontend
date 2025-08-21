import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, Sidebar, FooterComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  toggle = false;

  handleToggle() { 
    this.toggle = !this.toggle;

  
  }

}