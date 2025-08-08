import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../ui/footer/footer";
import { Navbar } from "../../ui/navbar/navbar";

@Component({
  selector: 'app-sponsorship-request-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sponsorship-request-page.html',
  styleUrls: ['./sponsorship-request-page.css']
})
export class SponsorshipRequestPage {
activeTab: string = 'sponsor';

}

