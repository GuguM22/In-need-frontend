import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerificationRequest } from '../../../dto/veriificationRequest';
import { CommonModule } from '@angular/common';
import { VerificationService } from '../../../service/verification-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pending',
  imports: [CommonModule],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css'
})
export class PendingComponent {
  @Input() applications: VerificationRequest[] = [];
  @Input() selectedApplication: VerificationRequest | null = null;
  @Output() select = new EventEmitter<VerificationRequest>();
  @Output() close = new EventEmitter<void>();
  // Track the selected application for detailed view
  @Output() approved = new EventEmitter<VerificationRequest>();
  @Output() rejected = new EventEmitter<VerificationRequest>();
  
  constructor(private verificationService: VerificationService, private http: HttpClient) {}

  // Set the selected application to show detailed view
  selectApplication(app: VerificationRequest): void {
    this.select.emit(app); // emit to parent
  }

  closeDetails(): void {
    this.close.emit(); // 🔴 This is what notifies the parent!
  }


  approveUser(app: VerificationRequest): void {
    if (!app || !app.userId) {
      console.error('User ID is missing');
      return;
    }
  
    this.verificationService.verifyUser(+app.userId).subscribe({
      next: () => {
        (app as any).verified = true; // ⚠️ Temporary if `verified` isn't in the interface
      },
      error: (err) => {
        console.error(`Error verifying user ${app.userId}:`, err);
      }
    });
  }

  rejectApplication(app: VerificationRequest): void {
    if (!app || !app.userId) {
      console.error('User ID is missing');
      return;
    }
  
    // Just remove the application from the list
    this.applications = this.applications.filter(a => a.userId !== app.userId);
    this.selectedApplication = null;
  }
  
  approve(app: VerificationRequest) {
    // Call your service to approve, then emit
    this.approved.emit(app);
  }
  
  reject(app: VerificationRequest) {
    // Call your service to reject, then emit
    this.rejected.emit(app);
  }
  

  downloadDocument(fileName: string): void {
    const url = `http://localhost:5050/api/verify/download/${fileName}`;
    window.open(url, '_blank');
  }
  
 
  
}
