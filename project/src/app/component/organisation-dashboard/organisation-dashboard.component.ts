import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SponsorRequest } from '../../Pages/sponsor-request/sponsor-request';

@Component({
  selector: 'app-organisation-dashboard',
  imports: [],
  templateUrl: './organisation-dashboard.component.html',
  styleUrl: './organisation-dashboard.component.css'
})
export class OrganisationDashboardComponent {


  constructor(private router: Router) { }

  navigateToSponsorRequest() {
    this.router.navigate(['sponsor-req']);
  }
}
