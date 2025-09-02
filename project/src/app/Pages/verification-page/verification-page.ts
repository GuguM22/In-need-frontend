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
  showPhoneNomberExistModal = false;
  showErrorMessage = false;
  showErrorCheck = false;
  phone: string = '';
  isAlreadyVerified = false;
  dashboardRoute: string = '/';
  
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

  ngOnInit(): void {
    /*this.verificationService.isVerified().subscribe({
      next: (verified: boolean) => {
        if (verified) {
          
          this.router.navigate(['/sponsor-request']);
        }
      },
      error: (err) => {
        console.error('Error checking verification:', err);
      }
    });*/

    //this.checkVerificationStatus();
  }

  private checkVerificationStatus(): void {
      const userId = sessionStorage.getItem('userId');
    if (userId) {
        this.verificationService.getUserVerificationStatus(userId).subscribe({
          next: (status: string) => {
            if (status === 'APPROVED') {
              this.isAlreadyVerified = true;
              this.router.navigate(['/sponsor-request']); // Redirect if already verified
            }
          },
          error: (err) => {
            console.error('Error checking verification status:', err);
          }
        });
      }
  }

  goBack() {
   
  const role = sessionStorage.getItem('userRole');

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

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const selectedFiles = Array.from(target.files);

      const allFiles = [...this.uploadedFiles, ...selectedFiles];

      const uniqueFiles = allFiles.filter(
        (file, index, self) =>
          index === self.findIndex(f => f.name === file.name && f.size === file.size)
      );

      this.uploadedFiles = uniqueFiles.filter(file => file.size < 5 * 1024 * 1024);

      this.verificationForm.patchValue({
        documents: this.uploadedFiles,
      });

      console.log('Selected files:', this.uploadedFiles);
    }
  }
  onSubmit(): void {
    if (this.isAlreadyVerified) {
        this.router.navigate(['/sponsor-request']);
        return;
      }


      if (this.verificationForm.valid && this.uploadedFiles.length > 0) {
        const rawPhone = this.verificationForm.value.phone;
        const normalizedPhone = this.normalizePhone(rawPhone);
        this.phone = rawPhone;

        this.createVerificationRequest();
      } else {
        this.verificationForm.markAllAsTouched();
        if (this.uploadedFiles.length === 0) {
          this.showErrorMessage = true;
        }
      }
  }

  private createVerificationRequest() {
    const placeholderUrls = this.uploadedFiles.map(file => `pending-${file.name}`);
      const email = sessionStorage.getItem('userEmail');
      const userId = sessionStorage.getItem('userId');
      const username = sessionStorage.getItem('userName');
      const verificationRequest: VerificationRequest = {
        id: 0,
        phone: this.verificationForm.value.phone,
        website: this.verificationForm.value.website,
        documents: placeholderUrls,
        email: email || '',
        userId: userId || '',
        status: 'PENDING',  // add this line
        username:  username || ''
      }
    // Check if required fields are present
    if (!email) {
      console.error('Email is required but not found in sessionStorage');
      // Handle the error - show message to user
      return;
    }
    
    if (!userId) {
      console.error('User ID is required but not found in sessionStorage');
      // Handle the error - show message to user
      return;
    }
    
    this.verificationService.createVerification(verificationRequest).subscribe({
      next: (res) => {
        const verificationId = res.id;
        sessionStorage.setItem('hasVerified', 'true'); 

        this.verificationService.uploadFiles(this.uploadedFiles, verificationId).subscribe({
          next: (uploadRes) => {
            this.router.navigate(['/upload-verification']); 
          },
          error: (uploadErr) => {
            console.error('File upload failed:', uploadErr);
          }
        });
      },
      error: (createErr) => {
        console.error('Verification creation failed:', createErr);
      }
    });
  }


  private normalizePhone(phone: string): string {
    // Remove non-numeric characters
    let numeric = phone.replace(/\D/g, '');

    // If starts with '0', replace with '27'
    if (numeric.startsWith('0')) {
      numeric = '27' + numeric.slice(1);
    }

    // If starts with '+27', remove '+'
    if (numeric.startsWith('27') && phone.startsWith('+27')) {
      numeric = '27' + numeric.slice(2);
    }

    return numeric;
  }
  onCloseDirecting(){
    this.router.navigate([this.dashboardRoute]);
  this.showPhoneNomberExistModal = false;
  }

  onClose() {
    
    this.showErrorMessage = false;
  }

}
