import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// TypeScript interface matching your backend DTO (except media URLs are backend-only)
export interface SponsorRequest {
  title: string;
  priority: string;
  quantity: number;
  requiredDate: string; // ISO date string e.g. "2025-08-12"
  description: string;
  media?: File[];
}

@Component({
  selector: 'app-sponsor-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sponsor-request.html',
  styleUrls: ['./sponsor-request.css']
})
export class SponsorRequestComponent implements OnDestroy {

  sponsorshipForm: FormGroup;
  selectedFiles: File[] = [];
  filePreviews: string[] = [];
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.sponsorshipForm = this.fb.group({
      title: ['', Validators.required],
      priority: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      requiredDate: [this.getTodayDate(), Validators.required],
      description: ['', Validators.required],
      media: [null]
    });
  }

  /** Get today's date in YYYY-MM-DD format */
  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /** Increment or decrement quantity */
  onQuantityChange(increment: boolean): void {
    const currentValue = this.sponsorshipForm.get('quantity')?.value || 0;
    const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);
    this.sponsorshipForm.patchValue({ quantity: newValue });
  }

  /** Handle file selection from file input */
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  /** Handle files dropped via drag-and-drop */
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  /** Prevent default dragover event */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  /** Prevent default dragleave event */
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  /** Generate previews and store selected files */
  private handleFiles(files: File[]): void {
    this.revokePreviews(); // clean old previews
    this.selectedFiles = files;
    this.filePreviews = files.map(file => URL.createObjectURL(file));
  }

  /** Revoke object URLs to avoid memory leaks */
  private revokePreviews(): void {
    this.filePreviews.forEach(url => URL.revokeObjectURL(url));
    this.filePreviews = [];
  }

  /** Submit form data as multipart/form-data */
  onSubmit(): void {
    if (this.sponsorshipForm.invalid) {
      this.sponsorshipForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('title', this.sponsorshipForm.get('title')?.value);
    formData.append('priority', this.sponsorshipForm.get('priority')?.value || '');
    formData.append('quantity', this.sponsorshipForm.get('quantity')?.value.toString());
    formData.append('requiredDate', this.sponsorshipForm.get('requiredDate')?.value);
    formData.append('description', this.sponsorshipForm.get('description')?.value);

    this.selectedFiles.forEach(file => {
      formData.append('media', file, file.name);
    });

    this.isSubmitting = true;

    this.http.post('http://10.100.3.53:5050/api/sponsor-requests', formData).subscribe({
      next: () => {
        alert('Sponsorship request submitted successfully!');
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error submitting request:', error);
        alert('Failed to submit sponsorship request.');
        this.isSubmitting = false;
      }
    });
  }

  /** Reset form and clear file selections */
  private resetForm(): void {
    this.sponsorshipForm.reset({
      title: '',
      priority: '',
      quantity: 1,
      requiredDate: this.getTodayDate(),
      description: '',
      media: null
    });
    this.selectedFiles = [];
    this.revokePreviews();
  }

  /** Clean up object URLs on component destroy */
  ngOnDestroy(): void {
    this.revokePreviews();
  }

  /** Navigate back or fallback alert */
  onBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      alert('No previous page available.');
    }
  }

  backButton(): void {
    this.router.navigate(['organisation-dashboard']);
  }

}
