import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verification-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verification-page.html',
  styleUrls: ['./verification-page.css'],
})
export class VerificationPage implements OnInit {
  uploadedFiles: File[] = [];
  verificationForm: FormGroup;

  // Validation
  validationMessages = {
    phone: {
      required: 'Phone number is required',
      minlength: 'Phone number cannot be less than 10 characters long',
      maxlength: 'Phone number cannot be more than 11 characters long',
      pattern: 'Phone number can only contain numbers with no spaces between',
    },
    website: {
      required: 'Website is required',
      pattern: 'Website must be a valid HTTPS link',
    },
    documents: {
      required: 'At least one document must be uploaded',
    },
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.verificationForm = this.formBuilder.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
          Validators.pattern(/^(0|27|\+27)[0-9]{9}$/),
        ],
      ],
      website: [
        '',
        [
          Validators.required,
           Validators.pattern(/^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z.]{2,}(\/\S*)?$/),
        ],
      ],
      documents: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  goBack() {
  this.router.navigate(['/sponsor-req']);
}

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.uploadedFiles = Array.from(target.files);

      // Check file type or size
      const validFiles = this.uploadedFiles.filter((file) => file.size < 5 * 1024 * 1024); // Max 5MB
      this.uploadedFiles = validFiles;

      this.verificationForm.patchValue({
        documents: this.uploadedFiles,
      });

      console.log('Selected files:', this.uploadedFiles);
    }
  }

  onSubmit(): void {
    if (this.verificationForm.valid) {
      console.log('Form submitted:', this.verificationForm.value);

    } else {
      this.verificationForm.markAllAsTouched();
    }
  }
}
