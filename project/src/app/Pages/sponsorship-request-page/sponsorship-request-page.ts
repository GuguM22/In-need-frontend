import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Donation } from '../../model/donation';
import { DonationService } from '../../service/donation-service';
import { DonationStateService } from '../../service/donation-state-service';
import { Services } from '../../service/services';
import { FooterComponent } from '../../ui/footer/footer';
import { NavbarComponent } from '../../ui/navbar/navbar';
import { Role } from '../../constant/role';

@Component({
  selector: 'app-sponsorship-request-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './sponsorship-request-page.html',
  styleUrls: ['./sponsorship-request-page.css'],
})
export class SponsorshipRequestPage {
  activeTab: string = 'sponsor';

  donations: Donation[] = [];
  removedIds: number[] = [];
  profileImageUrl: string = 'logo.png';
  dashboardRoute: string = '/';
  hasNewDonation: boolean = false;


  constructor(
    private router: Router,
    private donationService: DonationService,
    private service: Services,
    private donationStateService: DonationStateService
  ) { }

ngOnInit() {
  // Fetch donations from backend
  this.donationService.getDonations().subscribe(res => {
    const mappedDonations = res
      .filter(d => !this.removedIds.includes(d.id!))
      .map(donation => ({
        ...donation,
        id: donation.id!,
        profileImageUrl: donation.profileImageUrl
          ? `http://localhost:5050/auth/images/${donation.profileImageUrl}`
          : 'logo.png',
        donorName: donation.donorName,
        donorRole: donation.donorRole,
        
      }));
     
    // Save transformed donations in state service
    this.donationStateService.setDonations(mappedDonations);
  });

  // Subscribe to donation state
  this.donationStateService.donations$.subscribe(donations => {
    this.donations = donations;
    this.hasNewDonation = donations.length > 0;
  });

  this.loadImage(); 
}

loadImage() {
  // Optional: show default logo immediately
  this.profileImageUrl = 'logo.png';

  // Fetch user profile image
  this.service.profile().subscribe({
    next: (data: any) => {
      if (data.profileImageUrl) {
        // Slight delay for smoother loading effect
        setTimeout(() => {
          this.profileImageUrl = `http://localhost:5050/auth/images/${data.profileImageUrl}`;
        }, 2000);
      }
    },
    error: () => {
      // Keep default logo if error occurs
      this.profileImageUrl = 'logo.png';
    },
  });
}

capitalizeWords(name?: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


/*  loadDonations() {
    this.donationService.getDonations().subscribe((res: Donation[]) => {
      this.donations = res
        .filter(d => !this.removedIds.includes(d.id))
        .map(donation => ({
          ...donation,
          profileImageUrl: donation.profileImageUrl
            ? `http://localhost:5050/auth/images/${donation.profileImageUrl}`
            : 'logo.png',
          donorName: donation.donorName
        }));
    });
  }*/

  goBack() {
   
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
    this.router.navigate([this.dashboardRoute]);
  } 
}
