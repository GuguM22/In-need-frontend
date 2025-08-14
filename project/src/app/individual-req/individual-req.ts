import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IndividualService } from '../service/individual-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-individual-req',
   imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './individual-req.html',
  styleUrls: ['./individual-req.css']
})
export class IndividualReq implements OnDestroy {
onDragLeave($event: DragEvent) {
throw new Error('Method not implemented.');
}

  filePreviews: string[] = [];
  isSubmitting = false;
  individualForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private individualService: IndividualService
  ) {
    this.individualForm = this.fb.group({
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
    const currentValue = this.individualForm.get('quantity')?.value || 0;
    const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);
    this.individualForm.patchValue({ quantity: newValue });
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
    if (this.individualForm.invalid) {
      this.individualForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('title', this.individualForm.get('title')?.value);
    formData.append('priority', this.individualForm.get('priority')?.value || '');
    formData.append('quantity', String(this.individualForm.get('quantity')?.value));
    formData.append('requiredDate', this.individualForm.get('requiredDate')?.value);
    formData.append('description', this.individualForm.get('description')?.value);

    this.selectedFiles.forEach(file => {
      formData.append('media', file, file.name); // ✅ matches backend field name
    });

    this.isSubmitting = true;

    this.individualService.post(formData).subscribe({
      next: () => {
        this.resetForm();
        this.isSubmitting = false;
        this.router.navigate(['/upload-successfully']);
      },
      error: (error: any) => {
        console.error('Error submitting request:', error);
        alert('Failed to submit sponsorship request.');
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.individualForm.reset({
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

  ngOnDestroy(): void {
    this.revokePreviews();
  }

  backButton(): void {
    this.router.navigate(['organization-dashboard']);
  }
}
