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
    const sponsorDonations = res
      .filter(d => d.donorEmail === this.currentUserEmail && d.donorRole === 'SPONSORS')
      .map(d => ({
        ...d,
        profileImageUrl: d.profileImageUrl
          ? `http://localhost:5050/uploads/${d.profileImageUrl}` 
          : 'logo.png' 
      }));

    this.donations = sponsorDonations;
  });
}


  getStatusMessage(donation: Donation): string {
    switch (donation.status) {
      case 'PENDING': return 'Your donation is still pending.';
      case 'ACCEPTED': return 'Your donation has been accepted.';
      case 'DECLINED': return 'Your donation was rejected.';
      default: return 'Unknown status.';
    }
  }

  getImage(path?: string): string {
  return path ? `${this.services.baseUrl}/auth/images/${path}` : 'logo.png';
  }
}
