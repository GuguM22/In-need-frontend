import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from "../../ui/navbar/navbar";

@Component({
  selector: 'app-manage-sponsor-individual',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './manage-sponsor-individual.component.html',
  styleUrls: ['./manage-sponsor-individual.component.css']
})
export class ManageSponsorIndividualComponent {


  activeTab: string = 'posts';
  activeMenuId: string | null = null;
  isMenuOpen: boolean = false;

  posts = [
    {
      title: 'Medical Assistance',
      description:
        'Supporting an individual with essential medical equipment and supplies...',
      daysLeft: 7,
      progress: 99,
      fulfilled: false
    },
    {
      title: 'Wheelchair Donation',
      description:
        'Providing a new wheelchair to enhance mobility for an individual in need...',
      daysLeft: 20,
      progress: 45,
      fulfilled: false
    }
  ];
  router: any;

  toggleActionMenu(menuId: string): void {
    // Toggle menu open/close for specific post
    this.activeMenuId = this.activeMenuId === menuId ? null : menuId;
  }

  toggleMenu(): void {
    // Toggle generic menu
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Close menu if clicked outside the post menu
    if (!target.closest('.relative')) {
      this.activeMenuId = null;
    }
  }

  markFulfilled(index: number): void {
    // Mark a post as fulfilled
    if (this.posts[index]) {
      this.posts[index].fulfilled = true;
      this.activeMenuId = null;
    }
  }

  goBack() {
    this.router.navigate(['/Landing']); 
  }

  }

