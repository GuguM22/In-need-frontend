import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Navbar } from "../ui/navbar/navbar";
import { FooterComponent } from "../ui/footer/footer";

@Component({
  selector: 'app-donation-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Navbar, FooterComponent],
  templateUrl: './donation-request.html',
  styleUrls: ['./donation-request.css']
})
export class DonationRequest {

  sponsorshipForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.sponsorshipForm = this.fb.group({
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      requiredDate: ['', [Validators.required, this.futureDateValidator]],
      logistics: ['', Validators.required],
      notes: ['']
    });
  }
goNext() {
this.router.navigate(['/freq'])
}
  // Custom validator for future dates
  futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { pastDate: true };
  }

  goBack() {
    this.router.navigate(['/options']); // Adjust route as needed
  }

  onSubmit() {
    if (this.sponsorshipForm.valid) {
      // Process form data if needed
      this.router.navigate(['/freq']);
    } else {
      this.markFormGroupTouched(this.sponsorshipForm);
    }
  }

  onQuantityChange(increment: boolean): void {
    const currentValue = this.sponsorshipForm.get('quantity')?.value || 0;
    const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);
    this.sponsorshipForm.patchValue({ quantity: newValue });
  }

  onAvailabilityChange(increment: boolean): void {
    const currentValue = this.sponsorshipForm.get('availability')?.value || 0;
    const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);
    this.sponsorshipForm.patchValue({ availability: newValue });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}