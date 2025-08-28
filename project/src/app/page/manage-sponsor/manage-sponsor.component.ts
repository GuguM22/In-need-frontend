import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from "../../ui/navbar/navbar";
import { SponsorRequestService } from '../../service/sponsor-request-service';

@Component({
  selector: 'app-manage-sponsor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './manage-sponsor.component.html',
  styleUrls: ['./manage-sponsor.component.css']
})
export class ManageSponsorComponent {
  activeTab: string = 'posts';
  activeMenuId: string | null = null;
  post: any;
  i: any;
  sponsorId: any;

  constructor(private router: Router,
    private sponsorRequestService: SponsorRequestService,
    private route: ActivatedRoute
  ) {}

  goBack() {
    this.router.navigate(['/verification']);
  }

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

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.activeMenuId = null;
    }
  }

  posts = [
    {
      title: 'School Supplies',
      description:
        'Providing educational materials for 200+ children in underserved communities...',
      daysLeft: 15,
      progress: 90,
      fulfilled: false
    },
    {
      title: 'Food Drive',
      description: 'Helping feed 100+ families during the winter season...',
      daysLeft: 10,
      progress: 12,
      fulfilled: false
    }
  ];

  calculateProgress(progressLeft: number): number {
    const progress = 100; // the maximum progress value
    if (progressLeft <= 0) return 0;   // full bar
    if (progressLeft >= progress) return 100; // empty bar
    return (progressLeft / progress) * 100; // percentage
  }

  markFulfilled(index: number): void {
    this.posts[index].fulfilled = true;
    this.activeMenuId = null; // close menu
  }

  ngOnInit(): void {
     this.fetchUserPosts();
  }

  fetchUserPosts(): void {
    this.sponsorRequestService.getMyPosts().subscribe({
      next: (data) => {
        const newData = data.map((request) => {
          const msPerDay = 1000 * 60 * 60 * 24;
          const requiredDate = new Date(request.requiredDate).getTime();
          const today = new Date().getTime();

          const daysLeft = Math.ceil((requiredDate - today) / msPerDay);

          return { ...request, daysLeft}
        })
        this.posts = newData || [];
      },
      error: (err) => console.error('Error fetching user posts:', err)
    });
  }
}
    
  

  
  



