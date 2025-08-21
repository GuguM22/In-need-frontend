import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";
import { SponsorRequestService } from '../../service/sponsor-request-service';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  showError: boolean = false;
  errorMessage: string = '';
  currentStep: number = 1;
  totalSteps: number = 3;
  selectedType: string = "";
  requestId: string = '';
  requestDetails: any;

  donationOptions = [
    {
      label: 'Food Donations',
      value: 'food',
      description: 'Fresh foods, groceries, or packaged food items',
      icon: '🍞' // Replace with actual icon
    },
    {
      label: 'Item Donations',
      value: 'item',
      description: 'Clothing, household material, or personal items',
      icon: '👕'
    },
    {
      label: 'Service Donations',
      value: 'service',
      description: 'Volunteering or offering a helpful service',
      icon: '🤝'
    }
  ];

  constructor(private router: Router,  private route: ActivatedRoute,
    private sponsorService: SponsorRequestService) {}

  get isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  selectType(type: string) {
    this.selectedType = type
  }

  goNext(): void {
    if(this.selectedType == "") return

    localStorage.setItem('donationType', this.selectedType)

    this.router.navigate(['/donation-request'])
  }

  goBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showError = false;
    } else {
      this.errorMessage = 'You are already on the first step.';
      this.showError = true;
    }
  }

  validateStep(): boolean {
    // Replace this with your real validation logic
    // For example, check if a form field is filled
    // return this.myForm.valid;
    return false; // simulate validation failure
  }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';

    this.sponsorService.getById(this.requestId).subscribe({
      next: (data) => {
        this.requestDetails = data;
        // You now have the data for that specific organization/request
      },
      error: (err) => {
        console.error('Error fetching request details:', err);
      }
    });
  }
}

