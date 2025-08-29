import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IndividualService } from '../service/individual-service';
import { PreviewIndividual } from '../Pages/preview-individual/preview-individual';
import { Route, Router } from '@angular/router';

/** Validator: date cannot be in the past */
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
  selector: 'app-individual-req',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './individual-req.html',
  styleUrls: ['./individual-req.css'],
  providers: [IndividualService]
})
export class IndividualReq implements OnDestroy {

  isNewRequest: any;
  dashboardRoute: string = '/';
onDragLeave($event: DragEvent) {
throw new Error('Method not implemented.');
}
onDragOver($event: DragEvent) {
throw new Error('Method not implemented.');
}
onFileDrop($event: DragEvent) {
throw new Error('Method not implemented.');
}
filePreviews: { url: string; type: string }[] = [];
 individualForm: FormGroup;
  selectedFiles: File[] = [];
 
  isSubmitting = false;

  previewData: any = null;
  isEditing = true; // <-- control form vs preview

  constructor(
    private fb: FormBuilder,
    private individualService: IndividualService, 
    private router: Router
  ) {
    this.individualForm = this.fb.group({
      title: ['', Validators.required],
      urgency: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      neededByDate: [this.getTodayDate(), [Validators.required, futureDateValidator()]],
      description: ['', Validators.required]
    });
  }
  
  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  onSubmit(): void {
  if (this.individualForm.invalid) {
    this.individualForm.markAllAsTouched();
    return;
  }

  const formData = new FormData();
  formData.append('title', this.individualForm.get('title')?.value);
  formData.append('urgency', this.individualForm.get('urgency')?.value || '');
  formData.append('quantity', String(this.individualForm.get('quantity')?.value));
  formData.append('neededByDate', this.individualForm.get('neededByDate')?.value);
  formData.append('description', this.individualForm.get('description')?.value);
  this.selectedFiles.forEach(file => formData.append('mediaFiles', file, file.name));

  this.isSubmitting = true;

  if (!this.isNewRequest && this.previewData?.id) {
    // SECOND submission: update existing request → go back to table after
    this.individualService.update(this.previewData.id, formData).subscribe({
      next: (updated: any) => {
        this.isSubmitting = false;
        alert('Request updated successfully.');
        // Navigate back to table (or previous page)
        this.backButton(); // assuming this goes to the table page
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to update request.');
        this.isSubmitting = false;
      }
    });
  } else {
    // FIRST submission: create new request → go to preview mode
    this.individualService.post(formData).subscribe({
      next: (created: any) => {
        this.previewData = created;
        // Revoke previous previews
this.filePreviews.forEach(p => URL.revokeObjectURL(p.url));

// Map selected files to proper preview objects
this.filePreviews = this.selectedFiles.map(file => ({
  url: URL.createObjectURL(file),
  type: file.type
}));
      
        this.isEditing = false;       // go to preview
        this.isSubmitting = false;
        this.isNewRequest = false;    // mark that next submit will be an update
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to submit request.');
        this.isSubmitting = false;
      }
    });
  }
}

onEdit(): void {
  if (!this.previewData) return;
  this.isEditing = true;
  this.individualForm.patchValue({
    title: this.previewData.title,
    urgency: this.previewData.urgency,
    quantity: this.previewData.quantity,
    neededByDate: this.previewData.neededByDate,
    description: this.previewData.description
  });
 this.filePreviews = (this.previewData.mediaUrls || []).map((url: string) => ({
  url,
  type: url.endsWith('.mp4') ? 'video/mp4' : 'image/png' // fallback for images
}));


}
backButton(): void {
  // Option 1: Go back in browser history
  window.history.back();

}
onFileSelect(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    this.selectedFiles = Array.from(input.files);

    // Revoke previous previews
  // Revoke previous previews
this.filePreviews.forEach(p => URL.revokeObjectURL(p.url));

// Map selected files to proper preview objects
this.filePreviews = this.selectedFiles.map(file => ({
  url: URL.createObjectURL(file),
  type: file.type
}));

  }}
  ngOnDestroy(): void {
  // Revoke any object URLs to avoid memory leaks

 
}
  goBack() {
   
  const role = localStorage.getItem('userRole');
  this.filePreviews.forEach(p => URL.revokeObjectURL(p.url));
this.filePreviews = [];



    switch (role) {
      case 'SPONSORS':
        this.dashboardRoute = '/sponsor-dashboard';
        break;
      case 'ORGANIZATION':
        this.dashboardRoute = '/organization-dashboard';
        break;
      case 'INDIVIDUAL':
        this.dashboardRoute = '/individual-dashboard';
        break;
      case 'ADMIN':
        this.dashboardRoute = '/admin';
        break;
      default:
        this.dashboardRoute = '/individual-dashboard'; 
    }
    this.router.navigate([this.dashboardRoute]);
  
  }
}

