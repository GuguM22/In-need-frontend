import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SponsorRequest } from '../../Pages/sponsor-request/sponsor-request';
import { HttpClient } from '@angular/common/http';
import { SponsorRequestService } from '../../service/sponsor-request-service';

@Component({
  selector: 'app-organisation-dashboard',
  imports: [],
  templateUrl: './organisation-dashboard.component.html',
  styleUrl: './organisation-dashboard.component.css'
})
export class OrganisationDashboardComponent {

  requests: SponsorRequest[] = [];

  request: SponsorRequest = { 
    title: '',
    priority: '',
    quantity: 0,
    requiredDate: '',
    description: '',
    mediaUrls: []
  };


  constructor(private router: Router, private sponsorService: SponsorRequestService) { }

  ngOnInit(): void {
    this.loadSponsors();
  }

loadSponsors():void{
  this.sponsorService.getAll().subscribe({
    next: (data) => {
      this.requests = data;
      console.log(this.requests);
    }, 
    error: (error) => {
      console.error('Error fetching sponsor requests:', error);
    }
  })
}

  navigateToSponsorRequest() {
    this.router.navigate(['sponsor-request']);
  }
}
