import { CommonModule } from '@angular/common';
 import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../../ui/navbar/navbar";
 
 import { FooterComponent } from "../../ui/footer/footer";

@Component({
  selector: 'app-fequency',
   standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
 
  templateUrl: './fequency.html',
  styleUrls: ['./fequency.css']
})
export class Fequency implements OnInit {

  selectedFrequency: string = '';
  currentStep = 3; 

  frequencyTiles = [
    { icon: "icons/digitalwatch.svg", title: "One Time Donation", description: "Make a single donation now", value: "ONE_TIME" },
    { icon: "icons/analogwatch.svg", title: "Weekly", description: "Donate once a week", value: "WEEKLY" },
    { icon: "icons/monthlycalender.svg", title: "Monthly", description: "Donate monthly", value: "MONTHLY" },
    { icon: "icons/yearlycalender.svg", title: "Yearly", description: "Donate once a year", value: "QUARTERLY" }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Restore selection if coming back from Donation Review
    this.route.queryParams.subscribe(params => {
      this.selectedFrequency = (params['frequency'] || '').toUpperCase();
    });
  }

  selectFrequency(tileValue: string) {
    this.selectedFrequency = tileValue.toUpperCase();
  }

  goBack() {
    this.router.navigate(['/donation-request']); 
  }

  goNext() {
    if (!this.selectedFrequency) {
      alert('Please select a frequency before continuing.');
      return;
    }

    localStorage.setItem('donationFreq', this.selectedFrequency);

    this.router.navigate(['/donation-review'], { 
      queryParams: { frequency: this.selectedFrequency } 
    });
  }
}