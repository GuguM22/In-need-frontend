import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { Logout } from "../../component/logout/logout";
import { Services } from '../../service/services';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, Logout, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']

})
export class Sidebar implements OnInit {
  toggle = true;
  showLogoutModal = false;
  profileImageUrl: string = 'logo.png'; 

  constructor(private userService: Services, private router: Router) {}

  ngOnInit() {
  // Default logo
  this.profileImageUrl = 'logo.png';

  this.userService.profile().subscribe({
    next: (data: any) => {
      if (data.profileImagePath) {
        const img = new Image();
        img.src = `http://localhost:5050/auth/images/${data.profileImagePath}`;
        img.onload = () => {
          // Replace logo only after image is fully loaded
          this.profileImageUrl = img.src;
        };
        img.onerror = () => {
          // Fallback in case image fails to load
          this.profileImageUrl = 'logo.png';
        };
      }
    },
    error: () => {
      this.profileImageUrl = 'logo.png';
    }
  });
}



  handleToggle() {
    this.toggle = !this.toggle;
  }

  openLogoutModal() {
     this.toggle = false; 
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
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

  dashboardRoute: string = '/'; // default fallback

  ngOnInit() {
    const role = localStorage.getItem('userRole');

    switch (role) {
      case 'SPONSORS':
        this.dashboardRoute = '/sponsor-dashboard';
        break;
      case 'ORGANIZATION':
        this.dashboardRoute = '/organization-dashboard';
        break;
      case 'INDIVIDUAL':
        this.dashboardRoute = '/individual-dashboard';
        break;
      case 'ADMIN':
        this.dashboardRoute = '/admin';
        break;
      default:
        this.dashboardRoute = '/individual-dashboard'; // fallback
    }
  }
}