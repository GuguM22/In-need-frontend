import { Component, ElementRef, HostListener } from '@angular/core';
import { SponsorRequest } from '../../../model/sponsor-req';
import { SponsorRequestService } from '../../../service/sponsor-request-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../ui/footer/footer";
import { NavbarComponent } from "../../../ui/navbar/navbar";

@Component({
  selector: 'app-view-org-post',
  imports: [CommonModule, RouterLink, FooterComponent, NavbarComponent],
  templateUrl: './view-org-post.html',
  styleUrl: './view-org-post.css'
})
export class ViewOrgPost {
  requestId: string = '';
  request: SponsorRequest | null = null;
  userName: string | null = null;
  profileImageUrl: string = 'logo.png';
  showFullDescription = false;
  dashboardRoute: string = '/';

  constructor(
    private route: ActivatedRoute,
    private sponsorService: SponsorRequestService,
    private eRef: ElementRef
  ) {}

  ngOnInit(): void {
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
  
    this.userName = localStorage.getItem('userName');
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.loadPostDetails();
  }
  

  loadPostDetails(): void {
    console.log("in here")
    this.sponsorService.getById(this.requestId).subscribe({
      next: (data) => {
        this.request = data;
      },
      error: (err) => {
        console.error('Error loading post:', err);
      }
    });
  }

  getShortDescription(description: string): string {
    return description.length > 150 ? description.slice(0, 150) + '...' : description;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  getDaysLeftInfo(requiredDateStr: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize time
  
    const requiredDate = new Date(requiredDateStr);
    requiredDate.setHours(0, 0, 0, 0);
  
    // Use request.createdDate if it exists, otherwise assume 3 days before requiredDate
    const createdDate = this.request?.createdAt
      ? new Date(this.request.createdAt)
      : new Date(requiredDate.getTime() - 2 * 24 * 60 * 60 * 1000); // assume 3-day window
  
    createdDate.setHours(0, 0, 0, 0);
  
    const totalWindow = Math.max(
      Math.ceil((requiredDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)) + 1,
      1
    );
  
    const daysLeft = Math.max(
      Math.ceil((requiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
      0
    );
  
    const daysUsed = totalWindow - daysLeft;
  
    // return `Days Left: ${daysUsed}/${totalWindow}`;
    return `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;

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
      !this.eRef.nativeElement.querySelector('.description-wrapper')?.contains(event.target as Node)
    ) {
      this.showFullDescription = false;
    }
  }
}
