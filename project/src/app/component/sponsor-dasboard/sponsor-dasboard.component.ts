import { Component } from '@angular/core';
import { DonationDetails } from "../donation-component/donation-details/donation-details";
import { DonationFrequency } from "../donation-component/donation-frequency/donation-frequency";
import { DonationForm } from "../donation-component/donation-form/donation-form";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsor-dasboard',
  standalone: true,
  imports: [CommonModule,DonationForm],
  templateUrl: './sponsor-dasboard.component.html',
  styleUrls: ['./sponsor-dasboard.component.css']
})
export class SponsorDasboardComponent {

}
