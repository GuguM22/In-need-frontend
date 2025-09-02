import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DonationFrequency } from '../../constant/donation-frequency';
import { DonationStatus } from '../../constant/donationStatus';
import { LogisticPreference } from '../../constant/logistic-peference';
import { DonationUpdate } from '../../dto/donationUpdate';
import { Donation } from '../../model/donation';
import { DonationService } from '../../service/donation-service';
import { DonationStateService } from '../../service/donation-state-service';
import { Services } from '../../service/services';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from "../../ui/navbar/navbar";
import { Role } from '../../constant/role';

@Component({
  selector: 'app-review-request',
  imports: [FooterComponent, NavbarComponent, CommonModule, RouterModule],
  templateUrl: './review-request.html',
  styleUrls: ['./review-request.css']
})
export class ReviewRequest implements OnInit {

  emailAddress: string = '';
  profileImageUrl: string = '';
  removedIds: number[] = [];
  /*  donation: {
      id: number;
      description: string;
      quantity: number;
      preference: LogisticPreference;
      additionalNotes: string;
      donorEmail: string;
      donorName: string;
      createdAt: Date;
      availability: string;
      type: DonationType;
      frequency: DonationFrequency;
      profileImageUrl: string;
    }[] = [];*/


  donation: Donation[] = [];
  notification: { message: string, type: 'success' | 'error' } | null = null;
  backButtonVisible: boolean = true;
  acceptedPosts: Donation[] = [];



  constructor(private donationService: DonationService,
    private router: Router, private donationStateService: DonationStateService, private service: Services, private route: ActivatedRoute) {
    this.emailAddress = sessionStorage.getItem('userEmail') || '';

  }

  ngOnInit() {
    this.loadDonations();

  }

  /*getDonation() {
    this.donationService.getDonation(this.emailAddress).subscribe({
      next: (response) => {
        console.log(response)
        this.donation = response;
      },
      error: (err) => {
        console.error('Error fetching donation:', err);
      }
    });
  }*/
loadDonations() {
  this.donationService.getPendingDonations().subscribe(res => {
    console.log("Raw donations from backend:", res); // 👈 check actual structure
    const id = Number(this.route.snapshot.paramMap.get('id'))
    const mappedDonations = res
      .filter(d => d.id == id)
      .map(donation => ({
        ...donation,
        //  Fallback to any possible key the backend provides
        id: donation.id ?? donation.donationId ?? donation.requestId,

        description: donation.description || '',
        quantity: donation.quantity || 0,
        preference: donation.preference || LogisticPreference.DELIVERY,
        additionalNotes: donation.additionalNotes || '',
        donorEmail: donation.donorEmail || '',
        donorName: donation.donorName || '',
        createdAt: donation.createdAt ? new Date(donation.createdAt) : new Date(),
        availability: donation.availability || '',
        type: donation.type,
        frequency: donation.frequency || DonationFrequency.ONE_TIME,
        profileImageUrl: donation.profileImageUrl
          ? `http://localhost:5050/auth/images/${donation.profileImageUrl}`
          : 'logo.png',
        donorRole: donation.donorRole as Role | undefined,
      }));

    this.donationStateService.setDonations(mappedDonations);
  });

  this.donationStateService.donations$.subscribe(donations => {
    this.donation = donations;
    console.log("Donations after mapping:", this.donation); // 👈 check IDs exist
  });

  this.donationStateService.acceptedDonations$.subscribe(posts => {
    this.acceptedPosts = posts;
  });

  this.donationStateService.removedDonations$.subscribe(ids => {
    this.acceptedPosts = this.acceptedPosts.filter(post => !ids.includes(post.id));
  });
}

/*  updateDonation(id: number, isAccepted: boolean) {
    if (!id) {
    console.error("Donation ID is missing. Cannot update donation.");
    this.notification = {
      type: 'error',
      message: 'Donation ID is missing. Please refresh and try again.'
    };
    return;
  }
    const status = isAccepted ? DonationStatus.ACCEPTED : DonationStatus.DECLINED;
    const selectedDonation: DonationUpdate = { id, status };

    this.donationService.updateDonation(selectedDonation).subscribe({
      next: () => {
        // Remove the donation from the list
        this.donation = this.donation.filter(d => d.id !== id);
        this.donationStateService.removeDonation(id);

        // Hide the back button
        this.backButtonVisible = false;

        // Show notification
        this.notification = {
          type: 'success',
          message: isAccepted ? 'Donation accepted successfully' : 'Donation declined successfully'
        };

        // Navigate back after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/sponsorship-request-page']);
        }, 3000);
      },
      error: (err) => {
        console.error('Error updating donation:', err);
        this.notification = {
          type: 'error',
          message: 'Failed to update donation. Please try again.'
        };
      }
    });
  }*/

updateDonation(id: number, isAccepted: boolean) {
  if (!id) return;

  const status = isAccepted ? DonationStatus.ACCEPTED : DonationStatus.DECLINED;
  const selectedDonation: DonationUpdate = { id, status };

  this.donationService.updateDonation(selectedDonation).subscribe({
    next: (updatedDonation) => {
      // Remove from Sponsor Requests tab and Home Page
      this.donationStateService.removeDonation(id);

      // Optionally add to accepted posts if needed
      if (isAccepted) {
        this.donationStateService.addAcceptedDonation(updatedDonation);
      }

      this.notification = {
        type: 'success',
        message: isAccepted ? 'Donation accepted successfully' : 'Donation declined successfully'
      };

      setTimeout(() => this.router.navigate(['/sponsorship-request-page']), 3000);
    },
    error: (err) => {
      console.error(err);
      this.notification = { type: 'error', message: 'Failed to update donation.' };
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

  capitalizeWords(name?: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


}
