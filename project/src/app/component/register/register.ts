import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Services } from '../../service/services';
import { VerifyEmail } from "../../component/verify-email/verify-email";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, VerifyEmail],
  providers: [Services],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  showVerificationModal = false;
  submittedEmail: string = '';
  showErrorPopup = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  validationMessages = {
    username: {
      required: 'Name is required',
      minlength: 'Name must be at least 2 characters long',
      maxlength: 'Name cannot be more than 30 characters long',
      pattern: 'Name can only contain letters and spaces',
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
      pattern: 'Only Gmail addresses are allowed',

    },
    password: {
      required: 'Password is required',
      minlength: 'Min 8 chars',
      maxlength: 'Max 15 chars',
      pattern: 'Requires A-Z, a-z, 0-9, special char, no spaces',
    },
    confirmPassword: {
      required: 'Password is required',
      pattern: 'Passwords must match'
    },
    role: {
      required: 'Role is required',
    },
  };

  constructor(
    private auth: Services,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {

      

        username: [

          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
            Validators.pattern('^[a-zA-Z\\s]+$'),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[a-zA-Z0-9._%+\-]+@gmail\.com$/),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/)
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/),

          ],
        ],
        role: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.registerForm.get('email')?.valueChanges.subscribe(() => {
      const emailControl = this.registerForm.get('email');
      if (emailControl?.hasError('emailExists')) {
        const errors = { ...emailControl.errors };
        delete errors['emailExists'];
        if (Object.keys(errors).length === 0) {
          emailControl.setErrors(null);
        } else {
          emailControl.setErrors(errors);
        }
      }
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = this.registerForm.value;
    this.submittedEmail = formData.email;

    this.auth.register(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.showVerificationModal = true;
        this.registerForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const errorMsg = err.error?.message || err.error?.error || '';

        console.log('Error response:', err);

        if (err.status === 400 && errorMsg.toLowerCase().includes('email')) {
          this.errorMessage = 'This email is already registered';
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }

        this.showErrorPopup = true;

        const emailControl = this.registerForm.get('email');
        const existingErrors = emailControl?.errors || {};
        emailControl?.setErrors({ ...existingErrors, emailExists: true });
      },
    });
  }


  closeModal() {
    this.showVerificationModal = false;
    this.router.navigate(['/sign-in']);
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }
}
