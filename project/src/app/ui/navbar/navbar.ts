import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Services } from '../../service/services';
import { FooterComponent } from "../footer/footer";
import { Sidebar } from '../sidebar/sidebar';
import { DonationStateService } from '../../service/donation-state-service';
import { Donation } from '../../model/donation';
import { DonationService } from '../../service/donation-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, Sidebar, RouterModule],
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
  constructor(private service: Services, private donationStateService: DonationStateService, private donationService: DonationService,  private cd: ChangeDetectorRef) {}

//   ngOnInit() {
//   this.profileImageUrl = 'logo.png';

//   this.userRole = localStorage.getItem('userRole');

//   if (this.userRole === 'SPONSORS') {
//     this.hasNewDonation = false;
//     return;
//   }
//   this.donationStateService.donations$.subscribe((donations: Donation[]) => {
//     this.donationCount = donations.length;
//   });
//   this.service.profile().subscribe({
//     next: (data: any) => {
//       if (data.profileImagePath) {
//         const img = new Image();
//         img.src = `http://localhost:5050/auth/images/${data.profileImagePath}`;
//         img.onload = () => {
//           this.profileImageUrl = img.src;
//         };
//         img.onerror = () => {
//           this.profileImageUrl = 'logo.png';
//         };
//       }
//     },
//     error: () => {
//       this.profileImageUrl = 'logo.png';
//     }
//   });
// }

ngOnInit() {
  this.userRole = localStorage.getItem('userRole') ?? null;

  // Load profile image
  this.loadProfileImage();

  // Subscribe to donations BehaviorSubject to update counts reactively
  this.donationStateService.donations$.subscribe((donations: Donation[]) => {
    if (this.userRole === 'SPONSORS') {
      const userEmail = localStorage.getItem('userEmail');
      this.pendingSponsorRequestsCount = donations.filter(d =>
        d.donorRole === 'SPONSORS' &&
        d.status === 'PENDING' &&
        d.donorEmail === userEmail
      ).length;
    } else {
      // For ORG and other roles, show total donations count
      this.donationCount = donations.length;
    }
    this.cd.detectChanges(); // Trigger UI update
  });
}
  handleToggle() {
    this.toggle = !this.toggle;
  }
  handleSidebarClose() {
    this.toggle = false;  // 👈 Bring back the navbar
  }
  
  pendingSponsorRequestsCount: number = 0;
  get hasPendingDonations(): boolean {
    return this.pendingSponsorRequestsCount > 0;
  }

  private loadProfileImage() {
    this.service.profile().subscribe({
      next: (data: any) => {
        if (data.profileImagePath) {
          const img = new Image();
          img.src = `http://localhost:5050/auth/images/${data.profileImagePath}`;
          img.onload = () => {
            this.profileImageUrl = img.src;
            this.cd.detectChanges();
          };
          img.onerror = () => {
            this.profileImageUrl = 'logo.png';
            this.cd.detectChanges();
          };
        }
      },
      error: () => {
        this.profileImageUrl = 'logo.png';
        this.cd.detectChanges();
      }
    });
  }
}
