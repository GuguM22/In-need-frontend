import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { IndividualService } from '../service/individual-service';
import { CommonModule } from '@angular/common';

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
  styleUrls: ['./individual-req.css']
})
export class IndividualReq implements OnInit, OnDestroy {
  today: string = '';
  individualForm!: FormGroup;
  selectedFiles: File[] = [];
  filePreviews: string[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private individualService: IndividualService
  ) {}

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];

    this.individualForm = this.fb.group({
      title: ['', Validators.required],
      urgency: [''], // optional
      quantity: [1, [Validators.required, Validators.min(1)]],
      neededByDate: [this.today, [Validators.required, futureDateValidator()]],
      description: ['', Validators.required],
      media: [null]
    });
  }

  getTodayDate(): string {
    return this.today;
  }

  onQuantityChange(increment: boolean): void {
    const currentValue = this.individualForm.get('quantity')?.value || 0;
    const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);
    this.individualForm.patchValue({ quantity: newValue });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) this.handleFiles(Array.from(input.files));
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) this.handleFiles(Array.from(event.dataTransfer.files));
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
    if (this.individualForm.invalid) {
      this.individualForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const request = {
      title: this.individualForm.get('title')?.value,
      urgency: this.individualForm.get('urgency')?.value || '',
      quantity: Number(this.individualForm.get('quantity')?.value),
      neededByDate: this.individualForm.get('neededByDate')?.value,
      description: this.individualForm.get('description')?.value,
      mediaUrls: ["", ""]
    };

    localStorage.setItem('debugRequest', JSON.stringify(request));
    console.log('Request payload:', request);

    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    this.selectedFiles.forEach(file => formData.append('mediaFiles', file, file.name));

    this.isSubmitting = true;

    this.individualService.post(formData).subscribe({
      next: () => {
        this.resetForm();
        this.isSubmitting = false;
        this.router.navigate(['/upload-successfully']);
      },
      error: (error: any) => {
        console.error('Error submitting request:', error);
        alert('Failed to submit individual request: ' + error.message);
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.individualForm.reset({
      title: '',
      urgency: '',
      quantity: 1,
      neededByDate: this.getTodayDate(),
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
