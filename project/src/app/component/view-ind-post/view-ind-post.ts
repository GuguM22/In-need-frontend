import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IndividualRequest, IndividualService } from '../../service/individual-service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from '../../ui/navbar/navbar';
import { Loader } from '../../ui/loader/loader';

@Component({
  selector: 'app-view-ind-post',
  imports: [CommonModule, RouterLink, FooterComponent, NavbarComponent, Loader],
  templateUrl: './view-ind-post.html',
  styleUrl: './view-ind-post.css'
})
export class ViewIndPost {
  individual: IndividualRequest | null = null;
  id: string = '';
  dashboardRoute: string = '/';
  showFullDescription = false;
  profileImageUrl: string = 'logo.png';
  isLoading = true;


  constructor(private route: ActivatedRoute, private individualService: IndividualService) {
    setTimeout(() =>{
      this.isLoading = false}, 1000
    )
  }

  ngOnInit(): void {
    // Get ID from route
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.loadIndividual(this.id);
    }
  
    // Set dashboard route based on user role
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
  }
  

  loadIndividual(id: string): void {
    this.individualService.getById(id).subscribe({
      next: (data) => {
        this.individual = data;
        console.log('Individual post:', data);
      },
      error: (err) => {
        console.error('Error loading individual post:', err);
      }
    });
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
    const createdDate = this.individual?.neededByDate
      ? new Date(this.individual.neededByDate)
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
}
