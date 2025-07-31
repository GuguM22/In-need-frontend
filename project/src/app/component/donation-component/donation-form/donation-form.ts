import { Component } from '@angular/core';
import { DonationType } from "../donation-type/donation-type";
import { DonationDetails } from "../donation-details/donation-details";
import { DonationFrequency } from "../donation-frequency/donation-frequency";
import { DonationReview } from "../donation-review/donation-review";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donation-form',
  standalone: true,
  imports: [CommonModule, DonationType, DonationFrequency, DonationReview],
  templateUrl: './donation-form.html',
  styleUrls: ['./donation-form.css']
})
export class DonationForm {
  currentStep = 0;

  donationData: any = {
    type: '',
    description: '',
    quantity: 1,
    availability: '',
    additionalNotes: '',
    preference: '',
    frequency: '',
    donorEmail: '',
  };

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  updateForm(partial: any) {
    this.donationData = { ...this.donationData, ...partial };
  }

  submitDonation() {
   
  }
}