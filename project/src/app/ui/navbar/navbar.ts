import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Services } from '../../service/services';
import { FooterComponent } from "../footer/footer";
import { Sidebar } from '../sidebar/sidebar';
import { DonationStateService } from '../../service/donation-state-service';
import { Donation } from '../../model/donation';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, Sidebar],
   templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  toggle = false;
  profileImageUrl: string = 'logo.png'; 
  // @Input() hasNewDonation: boolean = false;
  @Input() donationCount: number = 0; 
  userRole: string | null = null;
  hasNewDonation: boolean = false;
  constructor(private service: Services, private donationStateService: DonationStateService) {}

  ngOnInit() {
  // Default logo
  this.profileImageUrl = 'logo.png';

  this.userRole = localStorage.getItem('userRole');

  if (this.userRole === 'SPONSORS') {
    this.hasNewDonation = false;
    return;
  }
  this.donationStateService.donations$.subscribe((donations: Donation[]) => {
    this.donationCount = donations.length;
  });
  this.service.profile().subscribe({
    next: (data: any) => {
      if (data.profileImagePath) {
        const img = new Image();
        img.src = `http://localhost:5050/auth/images/${data.profileImagePath}`;
        img.onload = () => {
          // Replace logo only after image is fully loaded
          this.profileImageUrl = img.src;
        };
        img.onerror = () => {
          // Fallback in case image fails to load
          this.profileImageUrl = 'logo.png';
        };
      }
    },
    error: () => {
      this.profileImageUrl = 'logo.png';
    }
  });
}

  handleToggle() {
    this.toggle = !this.toggle;
  }
  handleSidebarClose() {
    this.toggle = false;  // 👈 Bring back the navbar
  }
  
}
