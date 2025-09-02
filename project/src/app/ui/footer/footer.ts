import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Services } from '../../service/services';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent implements OnInit{
  
dashboardRoute: string = '/';
  currentUrl: string = '';
  userRole: string | null = null;

  donationRoutes = [
    '/options',
    '/donation-request',
    '/freq',
    '/donation-review'
  ];
  currentRoute: string = '';

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.userRole = (sessionStorage.getItem('userRole') || '').trim().toUpperCase();

    switch (this.userRole) {
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
        this.dashboardRoute = '/individual-dashboard';
    }

    this.currentUrl = this.router.url;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = (event as NavigationEnd).urlAfterRedirects;
    });

  }

  getNotificationRoute() {
    if (this.userRole === 'SPONSORS') {
      this.router.navigate(['/sponsor-activity']); // or your new sponsor activity route
    }
    this.router.navigate(['/sponsorship-request-page']); // for ORG and others
  }

  isActive(route: string): boolean {
    return this.currentUrl === route || this.currentUrl.startsWith(route + '/');
  }

  isDonationRoute(): boolean {
    if (this.userRole !== 'SPONSORS') return false; // only sponsors
    return this.donationRoutes.some(route =>
      this.currentUrl === route ||
      this.currentUrl.startsWith(route + '/') ||
      this.currentUrl.startsWith(route + '?')
    );
  }

  isViewRoute(): boolean {
    const viewRoutes = ['/view', '/view-post', '/view-indv-post'];
    return viewRoutes.some(route =>
      this.currentUrl === route ||
      this.currentUrl.startsWith(route + '/') ||
      this.currentUrl.startsWith(route + '?')
    );
  }

  goToDonation() {
    if (this.userRole === 'SPONSORS') {
      this.router.navigate(['/options']); 
    }
  }

  showPost() {
    console.log("Navigate to org / indi post ");
  }
  
}
