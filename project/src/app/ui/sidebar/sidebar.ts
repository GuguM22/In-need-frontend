import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
 styleUrls: ['./sidebar.css']

})
export class Sidebar {
  toggle = true; 

  handleToggle() {
    this.toggle = !this.toggle; 
  }
}