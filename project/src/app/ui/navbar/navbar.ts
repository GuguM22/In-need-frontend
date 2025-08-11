import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,                    // if standalone component
  imports: [CommonModule, Sidebar],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']           // fix plural here
})
export class NavbarComponent {
  toggle = false;

  handleToggle() {
    this.toggle = !this.toggle;
  }
}