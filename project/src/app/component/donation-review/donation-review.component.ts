import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DonationFrequency } from '../../constant/donation-frequency';
import { DonationType } from '../../constant/donation-type';
import { LogisticPreference } from '../../constant/logistic-peference';
import { DonationRequestDTO } from '../../dto/donationRequestDTO';
import { DonationService } from '../../service/donation-service';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from "../../ui/navbar/navbar";
import { Role } from '../../constant/role';

@Component({
  selector: 'app-donation-review',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  providers: [DonationService],
  templateUrl: './donation-review.component.html',
  styleUrls: ['./donation-review.component.css']
})
export class DonationReviewComponent implements OnInit {
goNext() {
throw new Error('Method not implemented.');
}

  selectedFrequency: string = '';
  selectedType: string = '';
  selectPreference: string = '';

  description: string = '';
  quantity: number = 1;
  availability: string = '';
  additionalNotes: string = '';
  emailAddress: string = '';
  userName: string = '';
  donorRole: string = '';
  selectedSponsorRequestId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donationService: DonationService 
  ) {}

  ngOnInit(): void {
    const donationJSON = localStorage.getItem('donationRequest') || '';
    if (donationJSON) {
      const donation = JSON.parse(donationJSON);
      this.description = donation.description || 'No description';
      this.quantity = donation.quantity || 1;
      this.selectPreference = donation.preference || ''; 
      this.selectedType = localStorage.getItem('donationType') || '';
      this.selectedFrequency = localStorage.getItem('donationFreq') || '';
      this.availability = donation.availability || '';
      this.additionalNotes = donation.additionalNotes || '';
      this.emailAddress = localStorage.getItem('userEmail') || '';
      this.userName = localStorage.getItem('userName') || '';
      this.donorRole = donation.role || '';
      this.selectedSponsorRequestId = donation.sponsorRequestId || undefined;
    }
  }

  goBack() {
    this.router.navigate(['/freq'], { 
      queryParams: { frequency: this.selectedFrequency } 
    });
  }

  /** Map string to Role enum */
  private mapToRole(roleStr: string): Role | undefined {
    switch (roleStr?.toUpperCase()) {
      case 'SPONSORS':
        return Role.SPONSORS;
      case 'ORGANIZATION':
        return Role.ORGANIZATION;
      case 'INDIVIDUAL':
        return Role.INDIVIDUAL;
      default:
        return undefined;
    }
  }

  confirmDonation() {
    if (!this.selectedType || !this.selectedFrequency) {
      alert('Donation type or frequency not selected!');
      return;
    }

    const donationRequest: DonationRequestDTO = {
      description: this.description,
      quantity: this.quantity,
      additionalNotes: this.additionalNotes,
      preference: this.selectPreference as LogisticPreference,
      type: this.selectedType as DonationType,
      frequency: this.selectedFrequency as DonationFrequency,
      donorEmail: this.emailAddress,
      createdAt: new Date(),
      availability: this.availability,
      donorName: this.userName,
      donorRole: this.mapToRole(this.donorRole),
      id: 0,
      sponsorRequestId: this.selectedSponsorRequestId,
    };

    this.donationService.createDonation(donationRequest).subscribe({
      next: (response) => {
        console.log('Donation created successfully:', response);
        this.router.navigate(['/thanks'], { 
          queryParams: { frequency: this.selectedFrequency } 
        });
      },
      error: (err) => {
        console.error('Error creating donation:', err);
        alert('Failed to submit donation. Please try again.');
      }
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

}