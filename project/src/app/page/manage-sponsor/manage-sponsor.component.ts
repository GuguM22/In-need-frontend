import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../ui/footer/footer";
import { Navbar } from "../../ui/navbar/navbar";

@Component({
  selector: 'app-manage-sponsor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent, Navbar],
  templateUrl: './manage-sponsor.component.html',
  styleUrls: ['./manage-sponsor.component.css']
})
export class ManageSponsorComponent {
activeTab: string = 'posts';
activeMenuId: string | null = null;
post: any;
i: any;

  toggleActionMenu(menuId: string): void {
    if (this.activeMenuId === menuId) {
      this.activeMenuId = null; // close if already open
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
      progress: 58,
      fulfilled: false
    },
    {
      title: 'Food Drive',
      description: 'Helping feed 100+ families during the winter season...',
      daysLeft: 10,
      progress: 72,
      fulfilled: false
    }
  ];

  markFulfilled(index: number): void {
    this.posts[index].fulfilled = true;
    this.activeMenuId = null; // close menu
  }

  deletePost(index: number): void {
    this.posts.splice(index, 1);
    this.activeMenuId = null; // close menu
  }

}

