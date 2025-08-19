import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";

@Component({
  selector: 'app-donation-review',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './donation-review.component.html',
  styleUrls: ['./donation-review.component.css']
})
export class DonationReviewComponent implements OnInit {

  selectedFrequency: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // ✅ Read frequency from query params
    this.route.queryParams.subscribe(params => {
      this.selectedFrequency = params['frequency'] || '';
    });
  }

  goBack() {
    // ✅ Send frequency back so the selected tile stays highlighted
    this.router.navigate(['/fequency'], { 
      queryParams: { frequency: this.selectedFrequency } 
    });
  }

  // confirmDonation() {
  //   alert(`You selected: ${this.selectedFrequency}`);
  // }
   confirmDonation() {
    if (!this.selectedFrequency) {
      alert('Please select a frequency before continuing.');
      return;
    }
    this.router.navigate(['/thanks'], { 
      queryParams: { frequency: this.selectedFrequency } 
    });
  }

}

