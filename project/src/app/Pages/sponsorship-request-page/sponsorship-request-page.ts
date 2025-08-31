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
import { DonationStatus } from '../../constant/donationStatus';
import { Loader } from '../../ui/loader/loader';

@Component({
  selector: 'app-sponsorship-request-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent, Loader],
  templateUrl: './sponsorship-request-page.html',
  styleUrls: ['./sponsorship-request-page.css'],
})
export class SponsorshipRequestPage {
  activeTab: string = 'sponsor';

  donations: Donation[] = [];
  removedIds: number[] = [];
  profileImageUrl: string = 'logo.png';
  dashboardRoute: string = '/';
  hasNewDonation: boolean = false;
  isLoading = true;
  message: string = '';


  constructor(
    private router: Router,
    private donationService: DonationService,
    private service: Services,
    private donationStateService: DonationStateService,
    private sponsorRequestService: SponsorRequestService
  ) {
    setTimeout(() =>{
      this.isLoading = false}, 1000
    )
   }

ngOnInit() {
const savedIds = localStorage.getItem('removedDonations');
  if (savedIds) {
    this.removedIds = JSON.parse(savedIds);
  }

  this.donationService.getDonations().subscribe(res => {
    const mappedDonations = res
      .filter(d => d.status === DonationStatus.PENDING)
      .filter(d => !this.removedIds.includes(d.id!))
      .map(donation => ({
        ...donation,
        id: donation.id!,
        profileImageUrl: donation.profileImageUrl
          ? `http://localhost:5050/auth/images/${donation.profileImageUrl}`
          : 'logo.png',
        donorName: donation.donorName,
        donorRole: donation.donorRole,
      }))
      .sort((a, b) => {
        const dateA = new Date(a.createdAt ?? 0).getTime();
        const dateB = new Date(b.createdAt ?? 0).getTime();
          return dateB - dateA;
        })
    this.donationStateService.setDonations(mappedDonations);
  });
  

  this.donationStateService.donations$.subscribe(donations => {
    this.donations = donations;
    this.hasNewDonation = donations.length > 0;
  });

  this.loadImage(); 
  this.fetchUserPosts();
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

  goBack() {
   
  const role = localStorage.getItem('userRole');

    switch (role) {
      case 'SPONSORS':
        this.dashboardRoute = '/sponsor-dashboard';
        break;
      case 'ORGANIZATION':
        this.dashboardRoute = '/organization-dashboard';
        break;
      case 'INDIVIDUAL':
        this.dashboardRoute = '/individual-dashboard';
        break;
      case 'ADMIN':
        this.dashboardRoute = '/admin';
        break;
      default:
        this.dashboardRoute = '/individual-dashboard'; 
    }
    this.router.navigate([this.dashboardRoute]);
  } 

  post: any;
  activeMenuId: string | null = null;
  i: any;
  sponsorId: any;

    posts = [
    { id: 1,
      title: 'School Supplies',
      description:
        'Providing educational materials for 200+ children in underserved communities...',
      daysLeft: 15,
      progress: 90,
      fulfilled: false
    }/*,
    {
      title: 'Food Drive',
      description: 'Helping feed 100+ families during the winter season...',
      daysLeft: 10,
      progress: 12,
      fulfilled: false
    }*/
  ];

    toggleActionMenu(menuId: string): void {
    if (this.activeMenuId === menuId) {
      this.activeMenuId = null;
    } else {
      this.activeMenuId = menuId;
    }
  }

   isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;  
  }

  calculateProgress(progressLeft: number): number {
    const progress = 100; // the maximum progress value
    if (progressLeft <= 0) return 0;   // full bar
    if (progressLeft >= progress) return 100; // empty bar
    return (progressLeft / progress) * 100; // percentage
  }

  markFulfilled(index: number): void {
    const fulfilledPost = this.posts[index];
    // Remove from UI immediately for responsiveness
    this.posts.splice(index, 1); 
    this.activeMenuId = null;
  
    this.sponsorRequestService.markPostAsFulfilled(fulfilledPost.id).subscribe({
      next: () => {
        this.message = 'Post fulfilled!';
        // Clear message after 3 seconds
        setTimeout(() => {
          this.message = '';
        }, 2000);
      },
      error: (err) => {
        console.error('Error marking fulfilled', err);
        this.message = 'Failed to mark post as fulfilled.';
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    });
  }
  
  


  fetchUserPosts(): void {
    this.sponsorRequestService.getMyPosts().subscribe({
      next: (data) => {
        const msPerDay = 1000 * 60 * 60 * 24;
        const today = new Date().getTime();
  
        const newData = data.map((request) => {
          const requiredDate = request.requiredDate;
          const createdAt = request.createdAt;
          const daysLeft = Math.ceil(
            (new Date(requiredDate).getTime() - today) / msPerDay
          );
  
          return { ...request, createdAt, requiredDate, daysLeft };
        });
  
        // 🔽 Sort by createdAt (newest first)
        this.posts = (newData || []).filter(post => !post.fulfilled).sort(
          
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
  
        console.log('Posts sorted by createdAt:', this.posts);
      },
      error: (err) => console.error('Error fetching user posts:', err)
    });
  }
  
  
}
