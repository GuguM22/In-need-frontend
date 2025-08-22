import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";
import { DonationFrequency } from '../../constant/donation-frequency';
import { DonationType } from '../../constant/donation-type';
import { LogisticPreference } from '../../constant/logistic-peference';
import { DonationRequestDTO } from '../../dto/donationRequestDTO';
import { DonationService } from '../../service/donation';

@Component({
  selector: 'app-donation-review',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  providers: [DonationService],
  templateUrl: './donation-review.component.html',
  styleUrls: ['./donation-review.component.css']
})
export class DonationReviewComponent implements OnInit {

  selectedFrequency: string = '';
  selectedType: string = '';
  selectPreference: string = '';

  description: string = '';
  quantity: number = 1;
  availability: string = '';
  additionalNotes: string = '';
  emailAddress: string = '';
  userName: string = '';

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
      this.selectedType = donation.type || '';
      this.selectedFrequency = localStorage.getItem('donationFreq') || '';
      this.availability = donation.availability || '';
      this.additionalNotes = donation.additionalNotes || '';
      this.emailAddress = localStorage.getItem('userEmail') || '';
      this.userName = localStorage.getItem('donorName') || '';

    }
  }

  goBack() {
    this.router.navigate(['/freq'], { 
      queryParams: { frequency: this.selectedFrequency } 
    });
  }

  confirmDonation() {
    if (!this.selectedType || !this.selectedFrequency) {
      alert('Donation type or frequency not selected!');
      return;
    }

    // Convert frequency to UPPER_CASE to match Spring Boot enum
    
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

}
