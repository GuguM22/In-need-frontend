import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Navbar } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";

@Component({
  selector: 'app-fequency',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar, FooterComponent],
  templateUrl: './fequency.html',
  styleUrls: ['./fequency.css']
})
export class Fequency implements OnInit {

  selectedFrequency: string = '';

  frequencyTiles = [
    { icon: "icons/digitalwatch.svg", title: "One Time Donation", description: "Make a single donation now", value: "one-time" },
    { icon: "icons/analogwatch.svg", title: "Weekly", description: "Donate once a week", value: "weekly" },
    { icon: "icons/monthlycalender.svg", title: "Monthly", description: "Donate monthly", value: "monthly" },
    { icon: "icons/yearlycalender.svg", title: "Yearly", description: "Donate once a year", value: "yearly" }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // ✅ Restore selection if coming back from Donation Review
    this.route.queryParams.subscribe(params => {
      this.selectedFrequency = params['frequency'] || '';
    });
  }

  goBack() {
    this.router.navigate(['/previous']); // replace with your actual previous page
  }

  goNext() {
    if (!this.selectedFrequency) {
      alert('Please select a frequency before continuing.');
      return;
    }
    this.router.navigate(['/donation-review'], { 
      queryParams: { frequency: this.selectedFrequency } 
    });
  }
}
