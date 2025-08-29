import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
 
import { CommonModule } from '@angular/common';
import { DonationService } from './service/donation-service';
import { DonationStateService } from './service/donation-state-service';
 

@Component({
  selector: 'app-root',
 
 
  standalone: true,

  imports: [CommonModule, RouterModule],

   templateUrl: './app.html',

  styleUrls: ['./app.css']
 })
export class App {
  protected title = 'project';

  constructor(
    private donationService: DonationService,
    private donationStateService: DonationStateService
  ) {}

  ngOnInit() {
    this.fetchDonations();
  }

  fetchDonations() {
    this.donationService.getDonations().subscribe((res) => {
      const mappedDonations = res.map(d => ({
        ...d,
        profileImageUrl: d.profileImageUrl
          ? `http://localhost:5050/auth/images/${d.profileImageUrl}`
          : 'logo.png',
      }));
      this.donationStateService.setDonations(mappedDonations);
    });
  }
}
