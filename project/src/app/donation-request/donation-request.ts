import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import {  NavbarComponent } from "../ui/navbar/navbar";
import { FooterComponent } from "../ui/footer/footer";
import { DonationRequestDTO } from '../dto/donationRequestDTO';
import { DonationType } from '../constant/donation-type';
import { DonationFrequency } from '../constant/donation-frequency';
import { SponsorRequestService } from '../service/sponsor-request-service';
import { SponsorRequest } from '../model/sponsor-req';

@Component({
  selector: 'app-donation-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,  FooterComponent, NavbarComponent],
  templateUrl: './donation-request.html',
  styleUrls: ['./donation-request.css']
})
export class DonationRequest {

  sponsorshipForm: FormGroup;
  requestId: string = '';
  sponsorRequestRequiredDate: string = '';
  sponsorRequiredDate: string = '';
  constructor(private fb: FormBuilder, private router: Router,   private route: ActivatedRoute, private sponsorRequestService: SponsorRequestService) {
    this.sponsorshipForm = this.fb.group({
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      requiredDate: ['', [Validators.required, this.futureDateValidator]],
      logistics: ['', Validators.required],
      notes: ['']
    });
    console.log(this.sponsorshipForm.value);
  }
goNext() {
  if (!this.sponsorshipForm.valid) {
    this.sponsorshipForm.markAllAsTouched();
    console.log('Form invalid', this.sponsorshipForm.value);
    return;
  }

  const formValue = this.sponsorshipForm.value;
  //console.log('Form values:', formValue);

  const donationRequest: DonationRequestDTO = {
    description: formValue.description,
    quantity: formValue.quantity,
    preference: formValue.logistics,
    additionalNotes: formValue.notes,
    donorEmail: localStorage.getItem('userEmail') || '',
    createdAt: new Date(),
    availability: formValue.requiredDate,
    type: DonationType.FOOD,
    frequency: DonationFrequency.ONE_TIME,
    donorName:  localStorage.getItem('donorName') || '',
    sponsorRequestId: this.requestId ? +this.requestId : undefined 
  };

  localStorage.setItem('donationRequest', JSON.stringify(donationRequest));
  this.router.navigate(['/freq'], {
    queryParams: { id: this.requestId }
  });
  }


  // Custom validator for future dates
  futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { pastDate: true };
  }

  goBack() {
    if (this.requestId) {
      this.router.navigate(['/options', this.requestId]);
    } else {
      this.router.navigate(['/profile']);  // fallback
    }
  }
  

  /*onSubmit() {
    if (this.sponsorshipForm.valid) {
      // Process form data if needed
      this.router.navigate(['/freq']);
    } else {
      this.markFormGroupTouched(this.sponsorshipForm);
    }
  }*/

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
  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
  
    if (this.requestId) {
      this.sponsorRequestService.getById(+this.requestId).subscribe({
        next: (sponsorRequest: SponsorRequest) => {
          this.sponsorRequestRequiredDate = sponsorRequest.requiredDate;
  
          // Add custom validator after date is fetched
          this.sponsorshipForm.get('requiredDate')?.setValidators([
            Validators.required,
            this.futureDateValidator,
            this.notAfterRequiredDateValidator(this.sponsorRequestRequiredDate)
          ]);
  
          this.sponsorshipForm.get('requiredDate')?.updateValueAndValidity();
        },
        error: err => {
          console.error('Failed to fetch sponsor request', err);
        }
      });
    }
  }
  
  notAfterRequiredDateValidator(requiredDate: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !requiredDate) return null;
  
      const selected = new Date(control.value);
      const required = new Date(requiredDate);
      selected.setHours(0, 0, 0, 0);
      required.setHours(0, 0, 0, 0);
  
      return selected <= required
        ? null
        : { afterRequiredDate: true };
    };
  }
  
}