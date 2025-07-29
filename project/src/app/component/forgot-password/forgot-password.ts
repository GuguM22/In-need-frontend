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

    if (this.forgotPasswordForm.invalid) return;

    const email = this.forgotPasswordForm.get('email')?.value;
    this.userService.sendResetLink(email).subscribe({
      next: () => {
        this.successMessage = 'Password reset link sent to your email.';
      },
      error: () => {
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    });
  }
}

