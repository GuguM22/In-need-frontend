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
  signInMessage = '';
  userName: string | null = null;

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
    this.userName = sessionStorage.getItem('userName');

    this.userService.login(email, password).subscribe({
      next: (response: LoginResponse) => {
        console.log(response)
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userRole', response.role);
        sessionStorage.setItem('userEmail', response.email);
        sessionStorage.setItem('verified', response.verified.toString());
        sessionStorage.setItem('userId', response.id.toString());
        sessionStorage.setItem('userName', response.username);

          this.userRole = response.role as Role;
          this.userName = response.username;
          this.signInMessage = `Welcome ${this.userName}`;

          this.loginError = '';

          setTimeout(() => {
            switch (this.userRole) {
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
                this.router.navigate(['/admin']);
                break;
              default:
                this.router.navigate(['/individual-dashboard']);
                break;
            }
          }, 2000);
        },
        error: (err) => {
          console.log('Backend error:', err);

          const backendError =
            err.error?.error ?? err.error?.message ?? err.message;

          if (err.error) {
    // err.error might be a string or object
    if (typeof err.error === 'string') {
      this.loginError = err.error;
    } else if (err.error.error) {
      this.loginError = err.error.error; // <- this will capture your "Invalid email or password"
    } else if (err.error.message) {
      this.loginError = err.error.message;
    } else {
      this.loginError = 'Invalid email or password.';
    }
  } else {
    this.loginError = 'Login failed. Please try again.';
  }
          this.userRole = null;
          this.userName = null;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
