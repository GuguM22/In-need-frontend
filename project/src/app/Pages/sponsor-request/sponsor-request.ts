import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SponsorRequestService } from '../../service/sponsor-request-service';
import { PreviewSponsor } from "../preview-sponsor/preview-sponsor";

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../../model/user';

// Backend DTO
export interface SponsorRequest {
  id?: string; 
  title: string;
  priority: string;
  quantity: number;
  requiredDate: string;
  description: string;
  mediaUrls?: File[];
  user?: User;
}

// Validator for dates
export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { pastDate: true };
  };
}

@Component({
  selector: 'app-sponsor-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PreviewSponsor],
  templateUrl: './sponsor-request.html',
  styleUrls: ['./sponsor-request.css'],
  providers: [SponsorRequestService]
})
export class SponsorRequestComponent implements OnInit, OnDestroy {
onEdit() {
throw new Error('Method not implemented.');

}
  requestId: number | null = null;





  sponsorshipForm: FormGroup;
  selectedFiles: File[] = [];
  filePreviews: string[] = [];
 
fileNames: string[] = [];     // file names

  isSubmitting = false;
  showPreview = false;
previewData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private sponsorRequestService: SponsorRequestService
  ) {
    this.sponsorshipForm = this.fb.group({
      title: ['', Validators.required],
      priority: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      requiredDate: [this.getTodayDate(), [Validators.required, futureDateValidator()]],
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
    if (input.files) this.handleFiles(Array.from(input.files));
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) this.handleFiles(Array.from(event.dataTransfer.files));
  }

  onDragOver(event: DragEvent): void { event.preventDefault(); }
  onDragLeave(event: DragEvent): void { event.preventDefault(); }

 private handleFiles(files: File[]): void {
  this.selectedFiles = files;
  this.filePreviews = files.map(file => URL.createObjectURL(file));
  this.fileNames = files.map(file => file.name);
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

  this.selectedFiles.forEach(file => formData.append('mediaFiles', file, file.name));

  this.isSubmitting = true;

 if (this.requestId) {
  // UPDATE
  this.sponsorRequestService.update(this.requestId, formData).subscribe({
    next: (response) => {
      this.isSubmitting = false;
      alert('Request updated successfully');
      this.showPreview = false; 
      this.requestId = null;   // 👈 reset after update if you want to allow new create
      if (response?.id) {
        this.router.navigate(['/preview-sponsor', response.id]);
      } else {
        console.error('No ID returned from backend');
      }
    },
    error: (err) => {
      console.error(err);
      this.isSubmitting = false;
      alert('Failed to update request');
    }
  });
} else {
  // CREATE
  this.sponsorRequestService.post(formData).subscribe({
    next: (createdRequest: any) => {
      this.isSubmitting = false;
      this.resetForm();
      this.requestId = null;   // 👈 ensure future submits start as CREATE
      if (createdRequest?.id) {
        // this.router.navigate(['/preview-sponsor', createdRequest.id]);
      } else {
        console.error('No ID returned from backend');
      }
    },
    error: (err) => {
      console.error(err);
      this.isSubmitting = false;
      alert('Failed to submit request.');
    }
  });
}
  }



ngOnInit(): void {
  this.requestId = null; 

  const state = history.state;
  if (state.formData) {
    this.sponsorshipForm.patchValue(state.formData);
    this.selectedFiles = state.files || [];
    this.filePreviews = this.selectedFiles.map(file => {
      if (file instanceof File) return URL.createObjectURL(file);
      return file; 
    });
    this.requestId = state.id || null;  // 👈 set requestId if editing
  }
}


  preview(): void {
  if (this.sponsorshipForm.valid) {
    this.previewData = this.sponsorshipForm.value;
    console.log('Preview Data:', this.previewData);
    console.log('File Names:', this.fileNames);
    this.showPreview = true;
  } else {
    this.sponsorshipForm.markAllAsTouched();
  }
}


  editForm(): void {
    this.showPreview = false;
  }

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

  backButton(): void {
    this.router.navigate(['uploaded']);
  }

  ngOnDestroy(): void {
  this.revokePreviews();
} 
} // <-- this closes SponsorRequestComponent class

