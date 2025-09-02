import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { Logout } from "../../component/logout/logout";
import { Services } from '../../service/services';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DonationService } from '../../service/donation-service';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, Logout, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']

})
export class Sidebar implements OnInit {
  showLogoutModal = false;
  profileImageUrl: string = 'logo.png'; 
  dashboardRoute: string = '/';
  @Input() donationCount: number = 0;
  @Input() toggle = false;
  @Output() closed = new EventEmitter<void>();
  userRole: string | null = null;
  pendingSponsorRequestsCount: number = 0;
  currentRoute: string = '';


  constructor(private userService: Services, private router: Router, private donationService: DonationService) {}

  ngOnInit() {
    // Load profile image
    this.profileImageUrl = 'logo.png';
    this.userRole = sessionStorage.getItem('userRole')
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
    const role = sessionStorage.getItem('userRole');
    switch (role) {
      case 'SPONSORS':
        this.dashboardRoute = '/sponsor-dashboard';
        this.loadPendingSponsorRequestsCount('SPONSORS');
        break;
      case 'ORGANIZATION':
        this.dashboardRoute = '/organization-dashboard';
        this.loadPendingSponsorRequestsCount('ORGANIZATION');
        break;
      case 'INDIVIDUAL':
        this.dashboardRoute = '/individual-dashboard';
        this.loadPendingSponsorRequestsCount('INDIVIDUAL');
        break;
      case 'ADMIN':
        this.dashboardRoute = '/admin';
        this.loadPendingSponsorRequestsCount('ADMIN');
        break;
      default:
        this.dashboardRoute = '/individual-dashboard'; 
        this.loadPendingSponsorRequestsCount('default');
    }

    this.currentRoute = this.router.url;
  }

  // handleToggle() {
  //   this.toggle = !this.toggle;
  // }

  handleToggle() {
    this.closed.emit();  // 👈 Notify the parent (NavbarComponent)
  }
  openLogoutModal() {
    this.showLogoutModal = true; // ✅ Show modal, keep sidebar open
    this.toggle = false;  // Close sidebar when modal opens
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
    const role = sessionStorage.getItem('userRole');

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

  getNotificationRoute() {
    if (this.userRole === 'SPONSORS') {
      this.router.navigate(['/sponsor-activity']); // or your new sponsor activity route
    }
    this.router.navigate(['/sponsorship-request-page']); // for ORG and others
  }


  // loadPendingSponsorRequestsCount() {
  //   this.donationService.getDonations().subscribe((donations: any[]) => {
  //     const userEmail = sessionStorage.getItem('userEmail');
  //     this.pendingSponsorRequestsCount = donations.filter(d => 
  //       d.donorRole === 'SPONSORS' &&
  //       d.status === 'PENDING' &&
  //       d.donorEmail === userEmail
  //     ).length;
  //   });
  // }
  loadPendingSponsorRequestsCount(role: string) {
    const userEmail = sessionStorage.getItem('userEmail');
    this.donationService.getDonations().subscribe((donations: any[]) => {
      this.pendingSponsorRequestsCount = donations.filter(d => 
        d.donorRole === role &&
        d.donorEmail === userEmail
      ).length;

    });
  }
  
}