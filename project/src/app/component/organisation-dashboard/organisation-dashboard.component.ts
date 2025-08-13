import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SponsorRequest } from '../../Pages/sponsor-request/sponsor-request';
import { Navbar } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";

@Component({
  selector: 'app-organisation-dashboard',
  imports: [Navbar, FooterComponent],
  templateUrl: './organisation-dashboard.component.html',
  styleUrl: './organisation-dashboard.component.css'
})
export class OrganisationDashboardComponent {


  constructor(private router: Router) { }

  navigateToSponsorRequest() {
    this.router.navigate(['sponsor-request']);
  }
}
