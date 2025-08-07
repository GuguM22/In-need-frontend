import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-sponsor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-sponsor.component.html',
  styleUrl: './manage-sponsor.component.css'
})
export class ManageSponsorComponent {
activeTab: string = 'posts';
activeMenuId: string | null = null;

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

  // Close when clicking outside (optional)
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative.flex')) {
      this.isMenuOpen = false;
    }
  }
}
