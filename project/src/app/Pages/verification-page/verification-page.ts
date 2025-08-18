import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../ui/navbar/navbar";
import { Sidebar } from "../../ui/sidebar/sidebar";
import { FooterComponent } from "../../ui/footer/footer";
import { VerificationRequest } from '../../dto/veriificationRequest';
import { VerificationService } from '../../service/verification-service';


@Component({
  selector: 'app-verification-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
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

  constructor(private formBuilder: FormBuilder, private router: Router, private verificationService: VerificationService) {
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
      const validFiles = this.uploadedFiles.filter((file) => file.size < 5 * 1024 * 1024); 
      this.uploadedFiles = validFiles;

      this.verificationForm.patchValue({
        documents: this.uploadedFiles,
      });

      console.log('Selected files:', this.uploadedFiles);
    }
  }


onSubmit(): void {
  if (this.verificationForm.valid && this.uploadedFiles.length > 0) {
    // Step 1: Create verification with placeholder document URLs
    const placeholderUrls = this.uploadedFiles.map(file => `pending-${file.name}`);

    const email = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');
     const username = localStorage.getItem('userName');
    const verificationRequest: VerificationRequest = {
      id: 0,
      phone: this.verificationForm.value.phone,
      website: this.verificationForm.value.website,
      documents: placeholderUrls,
      email: email || '',
      userId: userId || '',
      status: 'PENDING',  // add this line
     username:  username || ''


    };

    this.verificationService.createVerification(verificationRequest).subscribe({
      next: (res) => {
        const verificationId = res.id;
        console.log('Verification created with ID:', res.id);
        
        // Step 2: Upload actual files
        this.verificationService.uploadFiles(this.uploadedFiles, verificationId).subscribe({
          next: (uploadRes) => {
            console.log('Files uploaded successfully:', uploadRes.urls);
            // Optionally update verification with real URLs here if needed
            //this.router.navigate(['/success-page']);
          },
          error: (uploadErr) => {
            console.error('File upload failed:', uploadErr);
            // Handle upload error (maybe delete the verification record)
          }
        });
      },
      error: (createErr) => {
        console.error('Verification creation failed:', createErr);
      }
    });
  } else {
    this.verificationForm.markAllAsTouched();
    if (this.uploadedFiles.length === 0) {
      alert('Please upload at least one document');
    }
  }
}


}
