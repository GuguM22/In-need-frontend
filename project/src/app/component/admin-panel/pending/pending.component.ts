import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerificationRequest } from '../../../dto/veriificationRequest';
import { CommonModule } from '@angular/common';
import { VerificationService } from '../../../service/verification-service';

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
  
  constructor(private verificationService: VerificationService) {}

  // Set the selected application to show detailed view
  selectApplication(app: VerificationRequest): void {
    this.select.emit(app); // emit to parent
  }

  closeDetails(): void {
    this.close.emit(); // 🔴 This is what notifies the parent!
  }

  downloadDocument(documentId: number, fileName: string) {
    // Assuming you have a base URL where documents are hosted
    const baseUrl = 'http://localhost:5050/documents/download/'; // your backend endpoint
  
    const url = baseUrl + documentId;
  
    // Create an invisible <a> tag, trigger click to download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Suggest filename to browser
    // link.target = '_blank'; // open in new tab if browser blocks download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  approveUser(app: VerificationRequest): void {
    if (!app || !app.userId) {
      console.error('User ID is missing');
      return;
    }
  
    this.verificationService.verifyUser(+app.userId).subscribe({
      next: () => {
        (app as any).verified = true; // ⚠️ Temporary if `verified` isn't in the interface
        console.log(`User ${app.userId} verified successfully`);
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
  
    console.log(`User ${app.userId} application rejected (no action taken on backend).`);
  }
  
  approve(app: VerificationRequest) {
    // Call your service to approve, then emit
    this.approved.emit(app);
  }
  
  reject(app: VerificationRequest) {
    // Call your service to reject, then emit
    this.rejected.emit(app);
  }
  
}
