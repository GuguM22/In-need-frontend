import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Services } from '../../service/services';
import { Sidebar } from '../sidebar/sidebar';
import { Donation } from '../../model/donation';
import { DonationService } from '../../service/donation-service';
import { RouterModule } from '@angular/router';
import { SponsorRequestService } from '../../service/sponsor-request-service';
import { Subscription, interval, switchMap } from 'rxjs';

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
  subscription: Subscription | null = null;

  constructor(private service: Services, private donationService: DonationService,  private cd: ChangeDetectorRef, private sponsorRequestService: SponsorRequestService) {}

//   ngOnInit() {
//   this.profileImageUrl = 'logo.png';

//   this.userRole = sessionStorage.getItem('userRole');

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
  this.userRole = sessionStorage.getItem('userRole') ?? null;

  // Load profile image
  this.loadProfileImage();

  // Subscribe to donations BehaviorSubject to update counts reactively
  if (this.userRole === 'SPONSORS') {
    this.subscription = interval(1000)
    .pipe(
      switchMap(() => this.donationService.getDonations())
    )
    .subscribe((donations: Donation[]) => {
      const userEmail = sessionStorage.getItem('userEmail');

      this.donationCount = donations.filter(d =>
        d.donorRole === 'SPONSORS' &&
        d.donorEmail === userEmail &&
        d.isReceived !== true
      ).length;
    });
  } else if(this.userRole === 'ORGANIZATION') {
    this.subscription = interval(1000) // every 1 second
    .pipe(
      switchMap(() => this.sponsorRequestService.getMyPosts())
    )
    .subscribe({
      next: (data) => {
        const donations = data.flatMap(post => post.donations)
        .filter(donation => donation.status !== "ACCEPTED" && donation.status !== "DECLINED")
        this.donationCount = donations.length;
      },
      error: (err) => console.error('Error fetching user posts:', err)
    });
  }
}

ngOnDestroy() {
  this.subscription?.unsubscribe();
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
