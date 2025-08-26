import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Services } from '../../service/services';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  
  dashboardRoute: string = '/';
  showOptions: boolean = false;

 /* toggleOptions(event: MouseEvent) {
  event.stopPropagation(); // prevents "View" click from also firing
  this.showOptions = !this.showOptions;
}*/


goToDonation(){
  console.log("Navigate to sponsor donation");
}

showPost(){
  console.log("Navigate to org / indi post ");
}

  constructor(private router: Router) {}

  ngOnInit(): void {

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
        this.dashboardRoute = '/individual-dashboard';
    }
  }

isActive(route: string): boolean {
  return this.router.url === route || this.router.url.startsWith(route + '/');
}
isDonationRoute(): boolean {
  const donationRoutes = [
    '/options',
    '/donation-request',
    '/freq',
    '/donation-review'
  ];

  return donationRoutes.some(route =>
    this.router.url === route || this.router.url.startsWith(route + '/') || this.router.url.startsWith(route + '?')
  );
}

isViewRoute(): boolean {
  const viewRoutes = [
    '/view',
    '/view-post',
    '/view-indv-post'
  ];

  return viewRoutes.some(route =>
    this.router.url === route || this.router.url.startsWith(route + '/') || this.router.url.startsWith(route + '?')
  );
}


}
