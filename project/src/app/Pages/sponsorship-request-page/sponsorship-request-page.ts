import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from "../../ui/navbar/navbar";
import { Sidebar } from "../../ui/sidebar/sidebar";

@Component({
  selector: 'app-sponsorship-request-page',
  standalone: true,

  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './sponsorship-request-page.html',
  styleUrls: ['./sponsorship-request-page.css']
})
export class SponsorshipRequestPage {
activeTab: string = 'sponsor';
 
constructor(private router: Router){}

  goBack() {
  this.router.navigate(['/organization-dashboard']);
}

}

