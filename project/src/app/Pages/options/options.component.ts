import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
proceed() {
throw new Error('Method not implemented.');
}
cancel() {
throw new Error('Method not implemented.');
}

  showError: boolean = false;
  errorMessage: string = '';
  currentStep: number = 1;
  totalSteps: number = 3;

  get isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  goNext(): void {
    if (this.validateStep()) {
      this.showError = false;
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    } else {
      this.errorMessage = 'Please complete all required fields before continuing.';
      this.showError = true;
    }
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
  selectedType: string | undefined;

  selectDonation(type: string) {
    this.selectedType = type;
  }



}
