import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Donation } from '../model/donation';

@Injectable({
  providedIn: 'root',
})
export class DonationStateService {
  private donationsSubject = new BehaviorSubject<Donation[]>([]);
  donations$ = this.donationsSubject.asObservable();

  private acceptedDonationsSubject = new BehaviorSubject<Donation[]>([]);
  acceptedDonations$ = this.acceptedDonationsSubject.asObservable();

  private removedDonationsSubject = new BehaviorSubject<number[]>([]);
  removedDonations$ = this.removedDonationsSubject.asObservable();

  // Set the initial list of donations (Sponsor Requests)
  setDonations(donations: Donation[]) {
    this.donationsSubject.next(donations);
  }

  // Remove donation from Sponsor Requests and mark it removed globally
/*  removeDonation(id: number) {
    // Update Sponsor Requests
    this.donationsSubject.next(
      this.donationsSubject.value.filter(d => d.id !== id)
    );

    // Add to removed list
    this.addRemovedDonation(id);

    // Remove from accepted donations if it exists on Home Page
    this.removeAcceptedDonation(id);
  }*/

    removeDonation(id: number) {
  // Remove from Sponsor Requests
  this.donationsSubject.next(
    this.donationsSubject.value.filter(d => d.id !== id)
  );

  // Remove from Home Page lists (accepted posts or active requests)
  this.removeAcceptedDonation(id);

  // Optionally track globally removed IDs
  const removed = this.removedDonationsSubject.value;
  this.removedDonationsSubject.next([...removed, id]);
}


  // Add donation to Home Page accepted posts
  addAcceptedDonation(donation: Donation) {
    const current = this.acceptedDonationsSubject.value;
    this.acceptedDonationsSubject.next([...current, donation]);
  }

  // Remove donation from accepted posts (Home Page)
  removeAcceptedDonation(id: number) {
    const current = this.acceptedDonationsSubject.value;
    this.acceptedDonationsSubject.next(current.filter(d => d.id !== id));
  }

  // Track globally removed donation IDs
  private addRemovedDonation(id: number) {
    const current = this.removedDonationsSubject.value;
    this.removedDonationsSubject.next([...current, id]);
  }

  getDonationsSnapshot(): Donation[] {
    return this.donationsSubject.getValue();
  }

  getAcceptedDonationsSnapshot(): Donation[] {
    return this.acceptedDonationsSubject.getValue();
  }

  getRemovedDonationsSnapshot(): number[] {
    return this.removedDonationsSubject.getValue();
  }
}

