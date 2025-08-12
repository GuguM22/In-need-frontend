import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { Logout } from "../../component/logout/logout";
import { Services } from '../../service/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, Logout],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']

})
export class Sidebar {
  toggle = true;
  showLogoutModal = false;

  constructor(private userService: Services, private router: Router) {}

  handleToggle() {
    this.toggle = !this.toggle;
  }

  openLogoutModal() {
     this.toggle = false; 
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
    this.router.navigate(['/sponsor-dashboard']);
  }

  confirmLogout() {
    this.userService.logout().subscribe({
      next: () => {
        this.showLogoutModal = false;
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        this.router.navigate(['/sign-in']);
      },
    });
  }
}