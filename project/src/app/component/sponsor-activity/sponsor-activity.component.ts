import { Component } from '@angular/core';
import { Donation } from '../../model/donation';
import { DonationService } from '../../service/donation-service';
import { DonationStateService } from '../../service/donation-state-service';
import { NavbarComponent } from '../../ui/navbar/navbar';
import { FooterComponent } from '../../ui/footer/footer';
import { CommonModule } from '@angular/common';
import { Services } from '../../service/services';
import { SponsorRequest } from '../../model/sponsor-req';
import { SponsorRequestService } from '../../service/sponsor-request-service';

@Component({
  selector: 'app-sponsor-activity',
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './sponsor-activity.component.html',
  styleUrl: './sponsor-activity.component.css'
})
export class SponsorActivityComponent {

  donations: Donation[] = [];
  currentUserEmail: string | null = localStorage.getItem('userEmail');
   


  constructor(
    private donationService: DonationService,
    private donationStateService: DonationStateService,
    private services: Services,
  ) {}

  ngOnInit(): void {
    this.donationService.getDonations().subscribe(res => {
      const msPerDay = 1000 * 60 * 60 * 24;
      const now = new Date().getTime();
  
      const sponsorDonations = res
        .filter(d => d.donorEmail === this.currentUserEmail && d.donorRole === 'SPONSORS')
        // Filter out donations older than 2 days
        .filter(d => {
          if (!d.createdAt) return false;  // exclude if no date
          const createdAt = new Date(d.createdAt).getTime();
          const ageInDays = (now - createdAt) / msPerDay;
          return ageInDays <= 2;  // keep only donations <= 2 days old
        })
        .map(d => ({
          ...d,
          profileImageUrl: d.profileImageUrl
            ? `http://localhost:5050/uploads/${d.profileImageUrl}` 
            : 'logo.png' 
        }))
        .sort((a, b) => {
          const dateA = new Date(a.createdAt!).getTime();
          const dateB = new Date(b.createdAt!).getTime();
          return dateB - dateA; // Newest first
        });
  
      this.donations = sponsorDonations;
    });
  }
  

  getStatusMessage(donation: Donation): string {
    if (donation.status === 'ACCEPTED' && donation.isReceived) {
      return `Your donation has been accepted & received by ${donation.organizationUsername || 'the organization'} organization!`;
    }
    
  
    switch (donation.status) {
      case 'PENDING':
        return 'Your donation is still pending.';
      case 'ACCEPTED':
        return 'Your donation has been accepted.';
      case 'DECLINED':
        return 'Your donation was rejected.';
      default:
        return 'Unknown status.';
    }
  }
  

  getImage(path?: string): string {
  return path ? `${this.services.baseUrl}/auth/images/${path}` : 'logo.png';
  }
}
