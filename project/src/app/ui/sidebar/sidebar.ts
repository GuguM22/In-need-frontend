import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { Logout } from "../../component/logout/logout";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, Logout],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']

})
export class Sidebar {
  toggle = true; 

  handleToggle() {
    this.toggle = !this.toggle; 
  }
}