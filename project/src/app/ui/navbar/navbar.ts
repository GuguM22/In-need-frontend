import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [Sidebar, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  toggle = false;

  handleToggle() {
    this.toggle = !this.toggle;
  }
  
}
