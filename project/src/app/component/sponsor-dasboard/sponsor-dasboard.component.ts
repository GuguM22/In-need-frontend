import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from '../../ui/footer/footer';
import { Router, RouterLink } from '@angular/router';
import { SponsorRequest } from '../../model/sponsor-req';
import { SponsorRequestService } from '../../service/sponsor-request-service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IndividualRequest, IndividualService } from '../../service/individual-service';
import { Services } from '../../service/services';
import { Loader } from '../../ui/loader/loader';

@Component({
  selector: 'app-sponsor-dasboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink, FormsModule, Loader],
  templateUrl: './sponsor-dasboard.component.html',
  styleUrls: ['./sponsor-dasboard.component.css']
})
export class SponsorDasboardComponent {
  requests: SponsorRequest[] =[]
  individuals: IndividualRequest[] = [];
  isLoading = true;

 request: SponsorRequest = {
   title: '',
   priority: '',
   quantity: 0,
   requiredDate: '',
   createdAt: '',
   description: '',
   location: '',
   mediaUrls: [],
   fulfilled: false
    
 }

  constructor(private router: Router, 
    private sponsorService: SponsorRequestService, 
    private http: HttpClient, private elementRef: ElementRef, 
    private individualService: IndividualService,
   private service: Services ) {
    setTimeout(() =>{
      this.isLoading = false}, 1000
    )
    }
  searchQuery: string = '';
  filteredRequests: SponsorRequest[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  ngOnInit():void {
  this.loadRequests();
  this.loadIndividuals();
  }
  navigateToSponsorRequest() {
    this.router.navigate(['sponsor-request']);
  }

  loadRequests(): void {
    this.sponsorService.getAll().subscribe({
      next: (data) => {
        const unfulfilledRequests = data.filter(request => !request.fulfilled);

        this.requests = unfulfilledRequests.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        this.filteredRequests = [...this.requests];
        console.log('Requests loaded and sorted by createdAt:', this.requests);
      },
      error: (error) => {
        console.error('Error loading requests:', error);
      }
    });
  }

  calculateDaysLeft(requiredDate: string): number {
    const today = new Date();
    const endDate = new Date(requiredDate);
    const timeDiff = endDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24))); // No negative values
  }
  
  calculateProgressPercent(requiredDate: string): number {
    const totalDuration = 30; // assume 30 days for now, or store creationDate
    const daysLeft = this.calculateDaysLeft(requiredDate);
    const percent = ((totalDuration - daysLeft) / totalDuration) * 100;
    return Math.min(100, Math.max(0, percent)); // Clamp 0–100
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
  
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
  
    this.filteredRequests = this.requests.filter(request => {
      const matchesTitle = request.title.toLowerCase().includes(query);
      const matchesPriority = this.selectedPriority 
        ? request.priority.toLowerCase() === this.selectedPriority.toLowerCase() 
        : true;
  
      return matchesTitle && matchesPriority;
    });
  
    this.currentPage = 1;
  }
  
  
  
  get paginatedRequests(): SponsorRequest[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredRequests.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  // Calculate total pages
  get totalPages(): number {
    return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  get pagesArray(): number[] {
    const maxPages = 6;
    const total = this.totalPages;
    let startPage = 1;
  
    if (total <= maxPages) {
      return Array(total).fill(0).map((_, i) => i + 1);
    }
  
    // Calculate start page so currentPage is roughly in the middle
    if (this.currentPage > total - maxPages + 1) {
      startPage = total - maxPages + 1;
    } else if (this.currentPage > Math.floor(maxPages / 2)) {
      startPage = this.currentPage - Math.floor(maxPages / 2);
    }
  
    // Calculate how many pages to show (can't go past total)
    const pagesToShow = Math.min(maxPages, total - startPage + 1);
  
    return Array(pagesToShow).fill(0).map((_, i) => startPage + i);
  }
  
  goToPage(page: number): void {
    this.currentPage = page;
  }
  
  showFilterDropdown: boolean = false;
  selectedPriority: string = '';
  

onFilterChange(): void {
  this.onSearch(); // reuse logic
}

toggleFilterDropdown(): void {
  this.showFilterDropdown = !this.showFilterDropdown;
}

@HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent): void {
  const clickedInside = this.elementRef.nativeElement.contains(event.target);
  if (!clickedInside) {
    this.showFilterDropdown = false;
  }
}
loadIndividuals(): void {
  this.individualService.getAll().subscribe({
    next: (data) => {
      this.individuals = data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );      
      console.log('Individuals loaded (sorted by newest first):', this.individuals);
    },
    error: (error) => {
      console.error('Error loading individuals:', error);
    }
  });
}

getImage(path?: string): string {
  return path ? `${this.service.baseUrl}/auth/images/${path}` : 'logo.png';
}
}
