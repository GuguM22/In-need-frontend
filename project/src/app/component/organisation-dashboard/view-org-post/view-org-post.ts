import { Component, ElementRef, HostListener } from '@angular/core';
import { SponsorRequest } from '../../../model/sponsor-req';
import { SponsorRequestService } from '../../../service/sponsor-request-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../ui/footer/footer';
import { NavbarComponent } from '../../../ui/navbar/navbar';
import { Loader } from '../../../ui/loader/loader';
import { DonationService } from '../../../service/donation-service';
import { DonationRequest } from '../../../donation-request/donation-request';
import { Donation } from '../../../model/donation';
import { Services } from '../../../service/services';

@Component({
  selector: 'app-view-org-post',
  imports: [CommonModule, RouterLink, FooterComponent, NavbarComponent, Loader],
  templateUrl: './view-org-post.html',
  styleUrl: './view-org-post.css',
})
export class ViewOrgPost {
  requestId: string = '';
  request: SponsorRequest | null = null;
  userName: string | null = null;
  profileImageUrl: string = 'logo.png';
  showFullDescription = false;
  dashboardRoute: string = '/';
  isLoading = true;
  donationConfirmed?: boolean;
  showThankYouMessage: boolean = false; // add this
  donations: DonationSummary[] = [];

  constructor(
    private route: ActivatedRoute,
    private sponsorService: SponsorRequestService,
    private eRef: ElementRef,
    private donationService: DonationService,
    private services: Services
  ) {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnInit(): void {
    const role = sessionStorage.getItem('userRole');
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

    this.userName = sessionStorage.getItem('userName');
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.loadPostDetails();
    this.loadDonationsBySponsorRequestId();
  }
  loadPostDetails(): void {
    this.sponsorService.getById(this.requestId).subscribe({
      next: (data) => {
        this.request = data;

        // Ensure mediaUrls is an array
        if (this.request.mediaUrls && Array.isArray(this.request.mediaUrls)) {
          // Filter only strings, then map to full URLs if needed
          this.request.mediaUrls = this.request.mediaUrls
            .filter((url) => typeof url === 'string') // exclude non-string (File) entries if any
            .map((url) => {
              if (url.startsWith('http')) {
                return url;
              }
              // Encode URI components to handle spaces, special chars
              return `http://localhost:5050/uploads/${encodeURIComponent(url)}`;
            });
        } else {
          // If mediaUrls is undefined or not an array, set empty array
          this.request.mediaUrls = [];
        }

        // Now fetch donations associated with this post
        this.donationService
          .getDonationsBySponsorRequestId(Number(this.requestId))
          .subscribe({
            next: (donations) => {
              this.showThankYouMessage = donations.some(
                (d) => d.isReceived === true
              );
            },
            error: (err) => {
              console.error('Error fetching donations:', err);
            },
          });
      },
      error: (err) => {
        console.error('Error loading post:', err);
      },
    });
  }

  loadDonationsBySponsorRequestId(): void {
    this.donationService
      .getDonationsBySponsorRequestId(Number(this.requestId))
      .subscribe({
        next: (donations: Donation[]) => {
          this.donations = donations.map((d) => ({
            id: d.id,
            description: d.description,
            quantity: d.quantity,
            availability: d.availability,
            additionalNotes: d.additionalNotes,
            preference: d.preference,
            type: d.type,
            frequency: d.frequency,
            donorEmail: d.donorEmail,
            createdAt: d.createdAt,
            profileImageUrl: d.profileImageUrl,
            donorName: d.donorName || '',
            donorRole: d.donorRole || null,
            status: d.status,
            sponsorRequestId: d.sponsorRequestId,
            isReceived: d.isReceived,
          }));

          this.showThankYouMessage = this.donations.some(
            (d) => d.isReceived === true
          );
        },
        error: (err) => {
          console.error('Error fetching donations:', err);
        },
      });
  }

  getShortDescription(description: string): string {
    return description.length > 150
      ? description.slice(0, 150) + '...'
      : description;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  getDaysLeftInfo(requiredDateStr: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize time

    const requiredDate = new Date(requiredDateStr);
    requiredDate.setHours(0, 0, 0, 0);

    const daysLeft = Math.ceil(
      (requiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
      return 'Past Due';
    } else if (daysLeft === 0) {
      return 'Today';
    } else {
      return `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'low-priority';
      case 'medium':
        return 'medium-priority';
      case 'high':
        return 'high-priority';
      default:
        return '';
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (
      this.showFullDescription &&
      this.eRef.nativeElement.querySelector('.description-wrapper') &&
      !this.eRef.nativeElement
        .querySelector('.description-wrapper')
        ?.contains(event.target as Node)
    ) {
      this.showFullDescription = false;
    }
  }

  getDaysLeftText(requiredDateStr: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const requiredDate = new Date(requiredDateStr);
    requiredDate.setHours(0, 0, 0, 0);

    const daysLeft = Math.ceil(
      (requiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
      return 'Past Due';
    } else if (daysLeft === 0) {
      return 'Today';
    } else {
      return `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
    }
  }

  getDaysLeftClass(requiredDateStr: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const requiredDate = new Date(requiredDateStr);
    requiredDate.setHours(0, 0, 0, 0);

    const daysLeft = Math.ceil(
      (requiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
      return 'past-due';
    } else if (daysLeft === 0) {
      return 'today';
    } else {
      return 'future';
    }
  }

  getImage(path?: string): string {
    return path ? `${this.services.baseUrl}/auth/images/${path}` : 'logo.png';
  }
}
