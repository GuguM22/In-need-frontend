import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Services } from '../../service/services';
import { FooterComponent } from "../footer/footer";
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, Sidebar],
   templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  toggle = false;
  profileImageUrl: string = 'logo.png'; 

  constructor(private service: Services) {}

  ngOnInit() {
  // Default logo
  this.profileImageUrl = 'logo.png';

  this.service.profile().subscribe({
    next: (data: any) => {
      if (data.profileImagePath) {
        const img = new Image();
        img.src = `http://localhost:5050/auth/images/${data.profileImagePath}`;
        img.onload = () => {
          // Replace logo only after image is fully loaded
          this.profileImageUrl = img.src;
        };
        img.onerror = () => {
          // Fallback in case image fails to load
          this.profileImageUrl = 'logo.png';
        };
      }
    },
    error: () => {
      this.profileImageUrl = 'logo.png';
    }
  });
}

  handleToggle() {
    this.toggle = !this.toggle;
  }
}
