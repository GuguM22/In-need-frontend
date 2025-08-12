import { Component } from '@angular/core';
import { Services } from '../../service/services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  providers: [Services],
  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})
export class Logout {

  showLogoutModal = false;

  constructor(private userService: Services, private router: Router) {}

  openModal() {
    this.showLogoutModal = true;
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }
    // Helper method to handle complete logout process
  completeLogout(): void {
    this.userService.logout().subscribe({
      next: () => {
        // Redirect to login page after successful logout
        this.router.navigate(['/sign-in']);
         this.showLogoutModal = false;
      },
      error: (err) => {
        console.error('Logout failed:', err);
        // Still redirect even if server logout failed
        this.router.navigate(['/sign-in']);
      }
    });

  }
}
