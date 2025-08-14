import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SponsorRequest } from '../../Pages/sponsor-request/sponsor-request';
import { Navbar } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";
import { SponsorRequestService } from '../../service/sponsor-request-service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-organisation-dashboard',
  imports: [FooterComponent, Navbar, CommonModule, RouterLink, FormsModule],
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

  constructor(private router: Router, private sponsorService: SponsorRequestService, private http: HttpClient) { }
  searchQuery: string = '';
  filteredRequests: SponsorRequest[] = [];

  ngOnInit():void {
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
        this.filteredRequests = [...this.requests]; 

      },
      error: (error) => {
        console.error('Error loading requests:', error);
      }
    });
  }

  calculateDaysLeft(requiredDate: string): number {
    const today = new Date();
    const endDate = new Date(requiredDate);
    const timeDiff = endDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24))); // No negative values
  }
  
  calculateProgressPercent(requiredDate: string): number {
    const totalDuration = 30; // assume 30 days for now, or store creationDate
    const daysLeft = this.calculateDaysLeft(requiredDate);
    const percent = ((totalDuration - daysLeft) / totalDuration) * 100;
    return Math.min(100, Math.max(0, percent)); // Clamp 0–100
  }

  getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'low-priority';
      case 'medium':
        return 'medium-priority';
      case 'high':
        return 'high-priority';
      default:
        return '';
    }
  }
  
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
  
    this.filteredRequests = this.requests.filter(request =>
      request.title.toLowerCase().includes(query)
      // add more conditions if you want to search by description, location, etc.
    );
  }
  
  
}
