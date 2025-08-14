import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SponsorRequest } from '../../Pages/sponsor-request/sponsor-request';
import { Navbar } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";
import { SponsorRequestService } from '../../service/sponsor-request-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organisation-dashboard',
  imports: [FooterComponent, Navbar, CommonModule],
  templateUrl: './organisation-dashboard.component.html',
  styleUrl: './organisation-dashboard.component.css'
})
export class OrganisationDashboardComponent {
 requests: SponsorRequest[] =[]

 request: SponsorRequest = {
    title: '',
    priority: '',
    quantity: 0,
    requiredDate: '',
    description: '',
    mediaUrls: []}

  constructor(private router: Router, private sponsorService: SponsorRequestService) { }


  ngOnint():void {
  this.loadRequests();
  }
  navigateToSponsorRequest() {
    this.router.navigate(['sponsor-request']);
  }

  loadRequests():void {
    this.sponsorService.getAll().subscribe({
      next: (data) => {
        this.requests = data;
        console.log('Requests loaded:');
      },
      error: (error) => {
        console.error('Error loading requests:', error);
      }
    });
  }
}
