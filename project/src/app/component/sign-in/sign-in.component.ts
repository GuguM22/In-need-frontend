import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Services } from '../../service/services';
import { LoginResponse } from '../../dto/loginResponse';
import { Role } from '../../constant/role';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loginForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  loginError = '';
  userRole: string | null = null;


  constructor(
    private userService: Services,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
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
    });
  }

  ngOnInit(): void {}

 onSubmit() {
  if (this.loginForm.valid) {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.login(email, password).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.role);
        localStorage.setItem('userEmail', response.email);
        localStorage.setItem('verified', response.verified.toString());


        // Use enum for role checking
        const role = response.role as Role;

        // Optionally, show logged-in role on UI
        this.userRole = role; 

        switch (role) {
          case Role.SPONSORS:
            this.router.navigate(['/sponsor-dashboard']);
            break;
          case Role.ORGANIZATION:
            this.router.navigate(['/organization-dashboard']);
            break;
          case Role.INDIVIDUAL:
            this.router.navigate(['/individual-dashboard']);
            break;
          case Role.ADMIN:
            this.router.navigate(['/admin-dashboard']);
            break;
          default:
            this.router.navigate(['/individual-dashboard']);
            break;
        }
      },
      error: (err) => {
        if (err.error && err.error.error) {
          this.loginError = err.error?.error || 'Login failed';
        } else {
          this.loginError = 'Login failed. Please try again.';
        }
      },
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
}
}
