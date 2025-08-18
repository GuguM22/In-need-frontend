import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SponsorRequestService } from '../../service/sponsor-request-service';
import { Navbar } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";

// TypeScript interface matching your backend DTO (except media URLs are backend-only)
export interface SponsorRequest {
  title: string;
  priority: string;
  quantity: number;
  requiredDate: string; // ISO date string e.g. "2025-08-12"
  description: string;
  mediaUrls?: File[];
}

@Component({
  selector: 'app-sponsor-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sponsor-request.html',
  styleUrls: ['./sponsor-request.css'],
  providers: [SponsorRequestService]
})
export class SponsorRequestComponent implements OnDestroy {

  sponsorshipForm: FormGroup;
  selectedFiles: File[] = [];
  filePreviews: string[] = [];
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private sponsorRequestService: SponsorRequestService) {
    this.sponsorshipForm = this.fb.group({
      title: ['', Validators.required],
      priority: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      requiredDate: [this.getTodayDate(), Validators.required],
      description: ['', Validators.required],
      media: [null]
    });
  }

  
  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  onQuantityChange(increment: boolean): void {
    const currentValue = this.sponsorshipForm.get('quantity')?.value || 0;
    const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);
    this.sponsorshipForm.patchValue({ quantity: newValue });
  }

  
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
    this.revokePreviews(); 
    this.selectedFiles = files;
    this.filePreviews = files.map(file => URL.createObjectURL(file));
  }


  private revokePreviews(): void {
    this.filePreviews.forEach(url => URL.revokeObjectURL(url));
    this.filePreviews = [];
  }

  onSubmit(): void {
    if (this.sponsorshipForm.invalid) {
      this.sponsorshipForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('title', this.sponsorshipForm.get('title')?.value);
    formData.append('priority', this.sponsorshipForm.get('priority')?.value || '');
    formData.append('quantity', String(this.sponsorshipForm.get('quantity')?.value));
    formData.append('requiredDate', this.sponsorshipForm.get('requiredDate')?.value);
    formData.append('description', this.sponsorshipForm.get('description')?.value);


    this.selectedFiles.forEach(file => {
      formData.append('mediaurls', file, file.name);
    });

   this.isSubmitting = true;

this.sponsorRequestService.post(formData).subscribe({
  next: () => {
    this.resetForm();
    this.isSubmitting = false;
    this.router.navigate(['/upload-successfully']); // ✅ Redirect to success page
  },
  error: (error) => {
    console.error('Error submitting request:', error);
    alert('Failed to submit sponsorship request.');
    this.isSubmitting = false;
  }
});


  }
  private resetForm(): void {
    this.sponsorshipForm.reset({
      title: '',
      priority: '',
      quantity: 1,
      requiredDate: this.getTodayDate(),
      description: '',
      mediaUrls: []
    });
    this.selectedFiles = [];
    this.revokePreviews();
  }

 
  ngOnDestroy(): void {
    this.revokePreviews();
  }

 
  onBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      alert('No previous page available.');
    }
  }

  backButton(): void {
    this.router.navigate(['organization-dashboard']);
  }

  
}
