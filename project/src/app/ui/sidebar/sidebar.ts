import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { Logout } from "../../component/logout/logout";
import { Services } from '../../service/services';
import { Router, RouterModule } from '@angular/router';
import { DonationService } from '../../service/donation-service';



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
  dashboardRoute: string = '/';
  @Input() donationCount: number = 0;
  @Output() closed = new EventEmitter<void>();
  userRole: string | null = null;
  pendingSponsorRequestsCount: number = 0;



  constructor(private userService: Services, private router: Router, private donationService: DonationService) {}

  ngOnInit() {
    // Load profile image
    this.profileImageUrl = 'logo.png';
    this.userRole = localStorage.getItem('userRole')
    this.userService.profile().subscribe({
      next: (data: any) => {
        if (data.profileImagePath) {
          const img = new Image();
          img.src = `http://localhost:5050/auth/images/${data.profileImagePath}`;
          img.onload = () => this.profileImageUrl = img.src;
          img.onerror = () => this.profileImageUrl = 'logo.png';
        }
      },
      error: () => this.profileImageUrl = 'logo.png'
    });

    // Set dashboard route based on user role
    const role = localStorage.getItem('userRole');
    switch (role) {
      case 'SPONSORS':
        this.dashboardRoute = '/sponsor-dashboard';
        this.loadPendingSponsorRequestsCount();
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

  // handleToggle() {
  //   this.toggle = !this.toggle;
  // }

  handleToggle() {
    this.closed.emit();  // 👈 Notify the parent (NavbarComponent)
  }
  openLogoutModal() {
    this.showLogoutModal = true; // ✅ Show modal, keep sidebar open
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

  

 /* dashboardRoute: string = '/'; // default fallback

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
  }*/

  getNotificationRoute(): string {
    if (this.userRole === 'SPONSORS') {
      return '/sponsor-activity'; // or your new sponsor activity route
    }
    return '/sponsorship-request-page'; // for ORG and others
  }


  // loadPendingSponsorRequestsCount() {
  //   this.donationService.getDonations().subscribe((donations: any[]) => {
  //     const userEmail = localStorage.getItem('userEmail');
  //     this.pendingSponsorRequestsCount = donations.filter(d => 
  //       d.donorRole === 'SPONSORS' &&
  //       d.status === 'PENDING' &&
  //       d.donorEmail === userEmail
  //     ).length;
  //   });
  // }
  loadPendingSponsorRequestsCount() {
    const userEmail = localStorage.getItem('userEmail');
    this.donationService.getDonations().subscribe((donations: any[]) => {
      this.pendingSponsorRequestsCount = donations.filter(d => 
  d.donorRole === 'SPONSORS' &&
  d.donorEmail === userEmail
).length;

    });
  }
  
}