import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";



@Component({
  selector: 'app-organise-details',
    imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './organise-details.html',
  styleUrls: ['./organise-details.css']
})
export class OrganiseDetailsComponent implements OnInit {


  charity: Charity | null = null;
  donors: Donor[] = [];
  loading = true;
  error: string | null = null;
 
constructor(private router: Router) {}

  ngOnInit() {
    this.loadMockData();
  }


  loadMockData() {
    this.loading = true;
    this.error = null;

    setTimeout(() => {
      this.charity = {
        id: 1,
        name: 'Helping Hands Foundation',
        location: 'Cape Town, South Africa',
        avatarUrl: 'https://via.placeholder.com/150',
        verified: true,
        urgency: 'HIGH_PRIORITY',
        daysLeft: 10,
        totalDays: 30,
        campaignTitle: 'Food Drive for Local Communities',
        campaignDescription: [
          'We are raising funds to provide food parcels to under privileged families.Your support will help us reach more households during the winter season.'
        ],
        campaignGoal: 'R50,000'
      };

      this.donors = [
        {
          name: 'John Doe',
          avatarUrl: 'https://via.placeholder.com/50',
          type: 'Individual',
          deliveryDate: '2025-08-01',
          donationImages: [
            'https://via.placeholder.com/100',
            'https://via.placeholder.com/100',
            'https://via.placeholder.com/100'
          ]
        },
       
      ];

      this.loading = false;
    }, 1000); 
  }


  getUrgencyClass(urgency: string): string {
    switch (urgency) {
      case 'HIGH_PRIORITY':
        return 'badge-high-priority';
      case 'MEDIUM_PRIORITY':
        return 'badge-medium-priority';
      case 'LOW_PRIORITY':
        return 'badge-low-priority';
      default:
        return 'badge-default';
    }
  }

  // Badge Text
  getUrgencyText(urgency: string): string {
    switch (urgency) {
      case 'HIGH_PRIORITY':
        return 'High Priority';
      case 'MEDIUM_PRIORITY':
        return 'Medium Priority';
      case 'LOW_PRIORITY':
        return 'Low Priority';
      default:
        return urgency;
    }
  }

 
  onBack() {
    console.log('Navigate back');
  }


  onDonate() {
     this.router.navigate(['/options']);  
    }
  }
