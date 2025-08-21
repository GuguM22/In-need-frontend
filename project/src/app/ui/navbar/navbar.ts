import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer";
import { Services } from '../../service/services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FooterComponent, Sidebar],
   templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  toggle = false;
  profileImageUrl: string = 'logo.png'; 

  constructor(private service: Services) {}

  ngOnInit() {
    this.service.profile().subscribe({
      next: (data: any) => {
        if (data.profileImagePath) {
          this.profileImageUrl = `http://localhost:5050/auth/images/${data.profileImagePath}`;
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
