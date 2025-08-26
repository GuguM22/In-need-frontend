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

constructor(public service: Services){}

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

}
