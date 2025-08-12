import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Services } from '../../service/services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  providers: [Services],
  imports: [CommonModule, RouterModule, ReactiveFormsModule ],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private userService: Services) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        ],
      ],
    });
  }

  onSubmit(): void {
  this.submitted = true;
  this.successMessage = '';
  this.errorMessage = '';
  this.isLoading = true;

  if (this.forgotPasswordForm.invalid) {
    this.isLoading = false;
    return;
  }

  const email = this.forgotPasswordForm.get('email')?.value;
  
  this.userService.sendResetLink(email).subscribe({
    next: () => {
      this.successMessage = 'Password reset link has been sent to your email if the account exists.';
      this.errorMessage = '';
      this.isLoading = false;
      this.forgotPasswordForm.reset();
      this.submitted = false;
    },
    error: (err) => {
      this.isLoading = false;
      
      // We handle different error cases
      if (err.status === 0) {
        this.errorMessage = 'Network error. Please check your internet connection.';
      } else if (err.status === 404) {
        this.errorMessage = 'No account found with this email address.';
      } else if (err.error?.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
      }
    }
  });
}
}

