import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Services } from '../../service/services';
import { LoginResponse } from '../../dto/loginResponse';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

 loginForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private userService: Services,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.userService.login(email, password).subscribe({
        next: (response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('userEmail', response.email);

          // Redirect based on role
          switch (response.role) {
            case 'SPONSORS':
              this.router.navigate(['/sponsor-dashboard']);
              break;
            case 'ORGANIZATION':
              this.router.navigate(['/organization-dashboard']);
              break;
            case 'INDIVIDUAL':
              this.router.navigate(['/individual-dashboard']);
              break;
            default:
              this.router.navigate(['/individual-dashboard']); 
              break;
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
