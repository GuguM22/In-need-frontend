import { Component, OnInit } from '@angular/core';
import {  NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";
import { DonationService } from '../../service/donation';
import { DonationRequestDTO } from '../../dto/donationRequestDTO';
import { DonationType } from '../../constant/donation-type';
import { DonationFrequency } from '../../constant/donation-frequency';
import { LogisticPreference } from '../../constant/logistic-peference';
import { CommonModule } from '@angular/common';
import { DonationUpdate } from '../../dto/donationUpdate';

@Component({
  selector: 'app-review-request',
  imports: [FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './review-request.html',
  styleUrl: './review-request.css'
})
export class ReviewRequest implements OnInit {



  emailAddress: string = '';
  donations = [{
    id: 0,
    description: "",
    quantity: 0,
    preference: LogisticPreference.PICK_UP,
    additionalNotes: "",
    donorEmail: "",
    createdAt: new Date(),
    availability: "",
    type: DonationType.FOOD,
    frequency: DonationFrequency.ONE_TIME
  }];


  constructor(private donationService: DonationService) {
    this.emailAddress = localStorage.getItem('userEmail') || '';
  }

  ngOnInit() {
    this.getDonation();
  }

  getDonation() {
    this.donationService.getDonation(this.emailAddress).subscribe({
      next: (response) => {
        console.log(response)
        this.donations = response;
      },
      error: (err) => {
        console.error('Error fetching donation:', err);
      }
    });
  }

  updateDonation(id: number, isAccepted: boolean) {
    const selectedDonation = {id, isAccepted}

    this.donationService.updateDonation(selectedDonation).subscribe({
      next: (response) => {
        this.donations = response;
        if(isAccepted == true) 
          alert('Donation accepted successfully')
        else
          alert('Donation declined successfully')
      },
      error: (err) => {
        console.error('Error updating donation:', err);
      }
    });
  }
  showModal: boolean = false;
modalAction: 'accept' | 'decline' | null = null;
selectedDonationId: number | null = null;

openModal(donationId: number, action: 'accept' | 'decline') {
  this.selectedDonationId = donationId;
  this.modalAction = action;
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.modalAction = null;
  this.selectedDonationId = null;
}

confirmAction() {
  if (this.selectedDonationId && this.modalAction) {
    const isAccept = this.modalAction === 'accept';
    this.updateDonation(this.selectedDonationId, isAccept);
  }
  this.closeModal();
}

}
