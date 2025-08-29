import { Component } from '@angular/core';
import { Donation } from '../../model/donation';
import { DonationService } from '../../service/donation-service';
import { DonationStateService } from '../../service/donation-state-service';
import { NavbarComponent } from '../../ui/navbar/navbar';
import { FooterComponent } from '../../ui/footer/footer';
import { CommonModule } from '@angular/common';

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
    private donationStateService: DonationStateService
  ) {}

  ngOnInit(): void {
    this.donationService.getDonations().subscribe(res => {
      const sponsorDonations = res.filter(d =>
        d.donorEmail === this.currentUserEmail &&
        d.donorRole === 'SPONSORS'
      );
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
}
