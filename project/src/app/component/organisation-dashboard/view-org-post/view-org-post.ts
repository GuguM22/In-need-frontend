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
  
    const daysLeft = Math.ceil((requiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
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
      !this.eRef.nativeElement.querySelector('.description-wrapper')?.contains(event.target as Node)
    ) {
      this.showFullDescription = false;
    }
  }

  getDaysLeftText(requiredDateStr: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const requiredDate = new Date(requiredDateStr);
    requiredDate.setHours(0, 0, 0, 0);
  
    const daysLeft = Math.ceil((requiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
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
  
    const daysLeft = Math.ceil((requiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
    if (daysLeft < 0) {
      return 'past-due';
    } else if (daysLeft === 0) {
      return 'today';
    } else {
      return 'future';
    }
  }
  
}
