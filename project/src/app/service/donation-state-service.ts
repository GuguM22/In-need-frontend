import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Donation } from '../model/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationStateService {
  private donationsSubject = new BehaviorSubject<Donation[]>([]);
  donations$ = this.donationsSubject.asObservable();

  setDonations(donations: Donation[]) {
    this.donationsSubject.next(donations);
  }

  removeDonation(id: number) {
    this.donationsSubject.next(
      this.donationsSubject.value.filter(d => d.id !== id)
    );
  }
getDonationsSnapshot(): Donation[] {
  return this.donationsSubject.getValue();
}

}
