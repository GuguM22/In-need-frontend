import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";
import { SponsorRequestService } from '../../service/sponsor-request-service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SponsorRequest } from '../../model/sponsor-req';
import { IndividualRequest, IndividualService } from '../../service/individual-service';
import { Services } from '../../service/services';
import { DonationStateService } from '../../service/donation-state-service';
import { Loader } from '../../ui/loader/loader';

@Component({
  selector: 'app-organisation-dashboard',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule, RouterLink, FormsModule, Loader],
  templateUrl: './organisation-dashboard.component.html',
  styleUrl: './organisation-dashboard.component.css'
})
export class OrganisationDashboardComponent {
 requests: SponsorRequest[] =[]
 individuals: IndividualRequest[] = [];
 isVerified: boolean = false;
 showVerificationAlert: boolean = false;
//  request: SponsorRequest = {
//     title: '',
//     priority: '',
//     quantity: 0,
//     requiredDate: '',
//     description: '',
//     mediaUrls: []}
isLoading = true;

  constructor(private router: Router, private sponsorService: SponsorRequestService, 
    private http: HttpClient,
     private elementRef: ElementRef, 
     private individualService: IndividualService,
    private service: Services,  private donationStateService: DonationStateService,) {
      setTimeout(() =>{
        this.isLoading = false}, 1500
      )
  
     }
  searchQuery: string = '';
  filteredRequests: SponsorRequest[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  profileImageUrl: string = 'logo.png';
 
  ngOnInit():void {
  this.isVerified = localStorage.getItem('verified') === 'true';
  this.loadRequests();
  this.loadIndividuals();
  this.profileImageUrl = 'logo.png';
  // Remove requests automatically if accepted/declined
this.donationStateService.removedDonations$.subscribe((removedIds: number[]) => {
  if (removedIds.length > 0) {
    this.requests = this.requests.filter(r => !removedIds.includes(Number(r.id)));
    this.filteredRequests = this.filteredRequests.filter(r => !removedIds.includes(Number(r.id)));
  }
});


/*  this.service.profile().subscribe({
    next: (data: any) => {
      if (data.profileImagePath) {
        const img = new Image();
        img.src = `http://localhost:5050/auth/images/${data.profileImagePath}`;
        img.onload = () => {
          this.profileImageUrl = img.src;
        };
        img.onerror = () => {
          this.profileImageUrl = 'logo.png';
        };
      }
    },
    error: () => {
      this.profileImageUrl = 'logo.png';
    }
  });*/
  }


  navigateToSponsorRequest() {
    if (this.isVerified) {
      this.router.navigate(['sponsor-request']); // ✅ navigate only if verified
    } else {
      this.showVerificationAlert = true; // show alert if not verified
      setTimeout(() => this.showVerificationAlert = false, 7000); // optional: hide after 5s
    }
  }

  // loadRequests():void {
  //   this.sponsorService.getAll().subscribe({
  //     next: (data) => {
  //       this.requests = data;
  //       console.log('Requests loaded:');
  //       this.filteredRequests = [...this.requests]; 

  //     },
  //     error: (error) => {
  //       console.error('Error loading requests:', error);
  //     }
  //   });
  // }
  loadRequests(): void {
    this.sponsorService.getAll().subscribe({
      next: (data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize to date only
  
        const unfulfilledAndNotExpired = data
          .filter(request => {
            const requiredDate = new Date(request.requiredDate);
            requiredDate.setHours(0, 0, 0, 0); // normalize as well
            return (
              !request.fulfilled &&
              requiredDate >= today // ✅ only future or today
            );
          })
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
        this.requests = unfulfilledAndNotExpired;
        this.filteredRequests = [...this.requests];
        console.log('Requests loaded (excluding expired):', this.requests);
      },
      error: (error) => {
        console.error('Error loading requests:', error);
      }
    });
  }
  
  
  
  

  // calculateDaysLeft(requiredDate: string): number {
  //   const today = new Date();
  //   const endDate = new Date(requiredDate);
  //   const timeDiff = endDate.getTime() - today.getTime();
  //   return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24))); // No negative values
  // }
  calculateDaysLeft(requiredDate: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure comparison is at date level
    const endDate = new Date(requiredDate);
    endDate.setHours(0, 0, 0, 0);
    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Can be negative now
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
  
  // onSearch(): void {
  //   const query = this.searchQuery.toLowerCase();
  
  //   this.filteredRequests = this.requests.filter(request => {
  //     const matchesTitle = request.title.toLowerCase().includes(query);
  //     const matchesPriority = this.selectedPriority 
  //       ? request.priority.toLowerCase() === this.selectedPriority.toLowerCase() 
  //       : true;
  
  //     return matchesTitle && matchesPriority;
  //   });
  
  //   this.currentPage = 1;
  // }
  
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
  
    this.filteredRequests = this.requests.filter(request => {
      const matchesTitle = request.title.toLowerCase().includes(query);
      const matchesPriority = this.selectedPriority 
        ? request.priority.toLowerCase() === this.selectedPriority.toLowerCase() 
        : true;
  
      return matchesTitle && matchesPriority;
    });
  
    // Re-sort filtered requests newest first (just in case)
    this.filteredRequests.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  
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
  
  // get pagesArray(): number[] {
  //   return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  // }

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
goToVerification(): void {
  this.router.navigate(['/verification']);
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

viewPostDetails(id: string): void {
  this.router.navigate(['/view-post', id]);
}

onImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/images/library.png';  // or any fallback image path you have
}


getDaysLeftClass(requiredDate: string): string {
  const daysLeft = this.calculateDaysLeft(requiredDate);

  if (daysLeft < 0) return ' text-red-700 border-red-300';
  if (daysLeft === 0) return ' text-yellow-800 border-yellow-300';
  if (daysLeft <= 3) return ' text-orange-700 border-orange-300';
  return ' text-green-700 border-green-300';
}

getDaysLeftLabel(requiredDate: string): string {
  const daysLeft = this.calculateDaysLeft(requiredDate);
  if (daysLeft < 0) return 'Past Due';
  if (daysLeft === 0) return 'Today';
  return `${daysLeft} Days`;
}

getImage(path?: string): string {
  return path ? `${this.service.baseUrl}/auth/images/${path}` : 'logo.png';
}

}

