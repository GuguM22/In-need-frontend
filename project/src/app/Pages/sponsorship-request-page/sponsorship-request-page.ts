import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Donation } from '../../model/donation';
import { DonationService } from '../../service/donation-service';
import { DonationStateService } from '../../service/donation-state-service';
import { Services } from '../../service/services';
import { FooterComponent } from '../../ui/footer/footer';
import { NavbarComponent } from '../../ui/navbar/navbar';
import { Role } from '../../constant/role';
import { SponsorRequestService } from '../../service/sponsor-request-service';

interface Post {
  title: string,
  description: string,
  daysLeft: number,
  progress: number,
  fulfilled: boolean
}
@Component({
  selector: 'app-sponsorship-request-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './sponsorship-request-page.html',
  styleUrls: ['./sponsorship-request-page.css'],
})
export class SponsorshipRequestPage {
  activeTab: string = 'sponsor';

  donations: Donation[] = [];
  removedIds: number[] = [];
  profileImageUrl: string = 'logo.png';
  posts: Post[] = [
    {
      title: '',
      description: '',
      daysLeft: 0,
      progress: 0,
      fulfilled: false
    }
  ];
  activeMenuId: string | null = null;
  userId: number = 0;

  constructor(
    private router: Router,
    private donationService: DonationService,
    private service: Services,
    private donationStateService: DonationStateService,
    private sponsorRequestService: SponsorRequestService
  ) { }

ngOnInit() {
  this.userId = Number(localStorage.getItem("userId"))
  // Fetch donations from backend
  this.donationService.getDonations().subscribe(res => {
    const mappedDonations = res
      .filter(d => !this.removedIds.includes(d.id!))
      .map(donation => ({
        ...donation,
        id: donation.id!,
        profileImageUrl: donation.profileImageUrl
          ? `http://localhost:5050/auth/images/${donation.profileImageUrl}`
          : 'logo.png',
        donorName: donation.donorName,
        donorRole: donation.donorRole,
        
      }));
     
    // Save transformed donations in state service
    this.donationStateService.setDonations(mappedDonations);
  });

  // Subscribe to donation state
  this.donationStateService.donations$.subscribe(donations => {
    this.donations = donations;
  });

  this.loadImage(); 
  this.fetchUserPosts();
}

  toggleActionMenu(menuId: string): void {
    if (this.activeMenuId === menuId) {
      this.activeMenuId = null; // close if already open
    } else {
      this.activeMenuId = menuId;
    }
  }

  markFulfilled(index: number): void {
    this.posts[index].fulfilled = true;
    this.activeMenuId = null; // close menu
  }

  calculateProgress(progressLeft: number): number {
    const progress = 100; // the maximum progress value
    if (progressLeft <= 0) return 0;   // full bar
    if (progressLeft >= progress) return 100; // empty bar
    return (progressLeft / progress) * 100; // percentage
  }

loadImage() {
  // Optional: show default logo immediately
  this.profileImageUrl = 'logo.png';

  // Fetch user profile image
  this.service.profile().subscribe({
    next: (data: any) => {
      if (data.profileImageUrl) {
        // Slight delay for smoother loading effect
        setTimeout(() => {
          this.profileImageUrl = `http://localhost:5050/auth/images/${data.profileImageUrl}`;
        }, 2000);
      }
    },
    error: () => {
      // Keep default logo if error occurs
      this.profileImageUrl = 'logo.png';
    },
  });
}

capitalizeWords(name?: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


/*  loadDonations() {
    this.donationService.getDonations().subscribe((res: Donation[]) => {
      this.donations = res
        .filter(d => !this.removedIds.includes(d.id))
        .map(donation => ({
          ...donation,
          profileImageUrl: donation.profileImageUrl
            ? `http://localhost:5050/auth/images/${donation.profileImageUrl}`
            : 'logo.png',
          donorName: donation.donorName
        }));
    });
  }*/
  fetchUserPosts(): void {
    this.sponsorRequestService.getMyPosts().subscribe({
      next: (data) => {
        console.log(data)
        this.posts = [];
        const newData = data.filter(req => req?.user?.id == this.userId)
        .map((request) => {
          const msPerDay = 1000 * 60 * 60 * 24;
          const requiredDate = new Date(request.requiredDate).getTime();
          const today = new Date().getTime();

          const daysLeft = Math.ceil((requiredDate - today) / msPerDay);

          return { ...request, daysLeft}
        })
        console.log(newData)
        this.posts = newData || [];   
      },
      error: (err) => console.error('Error fetching user posts:', err)
    });
  }

  goBack() {
    this.router.navigate(['/organization-dashboard']);
  }
}
