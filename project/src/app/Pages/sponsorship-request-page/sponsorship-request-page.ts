import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../ui/footer/footer';
import { NavbarComponent } from '../../ui/navbar/navbar';
import { Sidebar } from '../../ui/sidebar/sidebar';
import { DonationService } from '../../service/donation';
import { Donation } from '../../model/donation';
import { Services } from '../../service/services';

@Component({
  selector: 'app-sponsorship-request-page',
  standalone: true,

  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './sponsorship-request-page.html',
  styleUrls: ['./sponsorship-request-page.css'],
})
export class SponsorshipRequestPage {
  activeTab: string = 'sponsor';

  constructor(
    private router: Router,
    private donationService: DonationService,
    private service: Services
  ) {}

  donations: Donation[] = [];
  profileImageUrl: string = 'logo.png';

  ngOnInit() {
    this.loadDonations();
    this.loadImage();
  }

  loadImage() {
    this.service.profile().subscribe({
      next: (data: any) => {
        if (data.profileImagePath) {
          this.profileImageUrl = `http://localhost:5050/auth/images/${data.profileImagePath}`;
        }
      },
      error: () => {
        this.profileImageUrl = 'logo.png';
      },
    });
  }
  loadDonations() {
    this.donationService.getDonations().subscribe((res: Donation[]) => {
      this.donations = res.map((donation) => ({
        ...donation,
        profileImageUrl: donation.profileImageUrl
          ? `http://localhost:5050/auth/images/${donation.profileImageUrl}`
          : 'logo.png',
      }));
    });
  }

  goBack() {
    this.router.navigate(['/organization-dashboard']);
  }
}
