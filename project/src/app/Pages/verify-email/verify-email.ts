import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Services } from '../../service/services';


@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [Services],
  templateUrl: './verify-email.html',  
  styleUrls: ['./verify-email.css'],  
})
export class VerifyEmail implements OnInit {
  ngOnInit(): void {}
/*  @Input() email: string = '';
  @Input() mode: 'token' | 'email' = 'token';
  @Output() close = new EventEmitter<void>();

  message = '';
  loading = false;
  isSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private userService: Services,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.mode === 'token') {
      this.verifyToken();
    } else {
      this.message = `Verification email sent to ${this.email}`;
      this.isSuccess = true;
    }
  }

  verifyToken() {
    const token = this.route.snapshot.queryParamMap.get('token');
    this.loading = true;
    
    if (token) {
      this.userService.verify(token).subscribe({
        next: (response: string) => {
          this.message = response;
          this.isSuccess = true;
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: () => {
          this.message = 'Invalid or expired token';
          this.isSuccess = false;
        },
        complete: () => this.loading = false
      });
    } else {
      this.message = 'No verification token provided';
      this.isSuccess = false;
      this.loading = false;
    }
  }

  onClose() {
    this.close.emit();
    if (this.mode === 'email') {
      this.router.navigate(['/sign-in']);
    }
  }*/
}