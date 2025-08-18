import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
today: any;
onDragLeave($event: DragEvent) {
throw new Error('Method not implemented.');
}


  filePreviews: string[] = [];
  isSubmitting = false;
 individualForm!: FormGroup;
  selectedFiles: File[] = [];

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
   
    quantity: [1, [Validators.required, Validators.min(1)]],
    requiredDate: [this.today, [Validators.required, this.minTodayDateValidator.bind(this)]],
    description: ['', Validators.required],
    media: [null]
  });

    }

onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  getTodayDate(): string {
  return this.today;
}
  
minTodayDateValidator(control: AbstractControl) {
  if (!control.value) return null;
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate < today ? { minDate: true } : null;
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

  // Request object
  const request = {
    title: this.individualForm.get('title')?.value,
    urgency: this.individualForm.get('priority')?.value || '',
    quantity: Number(this.individualForm.get('quantity')?.value),
    neededByDate: this.individualForm.get('requiredDate')?.value,
    description: this.individualForm.get('description')?.value,
    mediaUrls: ["", ""]
  };

  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

  this.selectedFiles.forEach(file => {
    formData.append('mediaFiles', file, file.name); 
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
      alert('Failed to submit individual request: ' + error.message);
      this.isSubmitting = false;
    }
  });
}

   
  private resetForm(): void {
  this.individualForm.reset({
    title: '',
    priority: '',
    quantity: 1,
    requiredDate: this.getTodayDate(), // <-- works now
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
