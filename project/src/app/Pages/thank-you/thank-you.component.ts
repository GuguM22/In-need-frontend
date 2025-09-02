import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from "../../ui/navbar/navbar";
import { Router } from '@angular/router';


@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, NavbarComponent],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const role = sessionStorage.getItem('userRole');
    let dashboardRoute = '/';

    switch (role) {
      case 'SPONSORS':
        dashboardRoute = '/sponsor-dashboard';
        break;
      case 'ORGANIZATION':
        dashboardRoute = '/organization-dashboard';
        break;
      case 'INDIVIDUAL':
        dashboardRoute = '/individual-dashboard';
        break;
      case 'ADMIN':
        dashboardRoute = '/admin';
        break;
      default:
        dashboardRoute = '/individual-dashboard'; // fallback
    }

    // Wait for 3 seconds then redirect
    setTimeout(() => {
      this.router.navigate([dashboardRoute]);
    }, 2000);
  }
}
