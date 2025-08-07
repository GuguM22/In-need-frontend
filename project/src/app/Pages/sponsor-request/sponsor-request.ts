import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-request',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './sponsor-request.html',
  styleUrl: './sponsor-request.css'
})
export class SponsorRequest {

  sponsorshipForm: FormGroup;
  selectedFiles: File[] = [];
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.sponsorshipForm = this.fb.group({
      title: ['', Validators.required],
      priority: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      requiredDate: [this.getTodayDate(), Validators.required],
      description: ['', Validators.required],
      media: [null]
    });

    // Reset defaults
    this.sponsorshipForm.reset({
      quantity: 0,
      requiredDate: null,
      description: ''
    });
  }
get priorityValue() {
  return this.sponsorshipForm.get('priority')?.value;
}

  
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onQuantityChange(increment: boolean): void {
  const currentValue = this.sponsorshipForm.get('quantity')?.value || 0;
  const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);
  this.sponsorshipForm.patchValue({ quantity: newValue });
}

OnselectedFiles: File[] = [];
filePreviews: string[] = [];

onFileSelect(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    this.handleFiles(Array.from(input.files));
  }
}

onFileDrop(event: DragEvent): void {
  event.preventDefault();
  if (event.dataTransfer?.files) {
    this.handleFiles(Array.from(event.dataTransfer.files));
  }
}

onDragOver(event: DragEvent): void {
  event.preventDefault();
}

onDragLeave(event: DragEvent): void {
  event.preventDefault();
}

private handleFiles(files: File[]): void {
  this.selectedFiles = files;

  // Generate previews
  this.filePreviews = files.map(file => URL.createObjectURL(file));
}


  onSubmit(): void {
    if (this.sponsorshipForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        alert('Sponsorship request submitted successfully!');
        this.sponsorshipForm.reset();
        this.sponsorshipForm.patchValue({
          quantity: 1,
          requiredDate: this.getTodayDate(),
          description: ''
        });
        this.selectedFiles = [];
        this.isSubmitting = false;
      }, 2000);
    } else {
      Object.keys(this.sponsorshipForm.controls).forEach(key => {
        this.sponsorshipForm.get(key)?.markAsTouched();
      });
    }
  }

  /** FIXED: Properly return priority control from sponsorshipForm */
  get priorityControl() {
    return this.sponsorshipForm.get('priority');
  }

  onBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      alert('This would navigate back to the previous page');
    }
  }

  backButton(){
    this.router.navigate(['organisation-dashboard']);
  }
}

