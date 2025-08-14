import { Component, ElementRef, HostListener } from '@angular/core';
import { SponsorRequest } from '../../model/sponsor-req';
import { Router, RouterLink } from '@angular/router';
import { SponsorRequestService } from '../../service/sponsor-request-service';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../../ui/footer/footer';
import { Navbar } from '../../ui/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-individual-dasboard',
  standalone: true,
  imports: [FooterComponent, Navbar, CommonModule, RouterLink, FormsModule],
  templateUrl: './individual-dasboard.component.html',
  styleUrl: './individual-dasboard.component.css'
})
export class IndividualDasboardComponent {
  requests: SponsorRequest[] =[]

  request: SponsorRequest = {
     title: '',
     priority: '',
     quantity: 0,
     requiredDate: '',
     description: '',
     mediaUrls: []}
 
   constructor(private router: Router, private sponsorService: SponsorRequestService, private http: HttpClient, private elementRef: ElementRef) { }
   searchQuery: string = '';
   filteredRequests: SponsorRequest[] = [];
   currentPage: number = 1;
   itemsPerPage: number = 3;
 
   ngOnInit():void {
   this.loadRequests();
   }
   navigateToSponsorRequest() {
     this.router.navigate(['sponsor-request']);
   }
 
   loadRequests():void {
     this.sponsorService.getAll().subscribe({
       next: (data) => {
         this.requests = data;
         console.log('Requests loaded:');
         this.filteredRequests = [...this.requests]; 
 
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
     return Array(this.totalPages).fill(0).map((x, i) => i + 1);
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
}
