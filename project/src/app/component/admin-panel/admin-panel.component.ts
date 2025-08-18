import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PendingComponent } from './pending/pending.component';
import { ApprovedComponent } from './approved/approved.component';
import { RejectedComponent } from './rejected/rejected.component';
import { VerificationRequest, VerificationResponse } from '../../dto/veriificationRequest';
import { VerificationService } from '../../service/verification-service';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, PendingComponent, ApprovedComponent, RejectedComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  userEmail: string | null = null;
  userId: string | null = null; 
  applications: VerificationRequest[] = [];
  pendingApplications: VerificationRequest[] = [];
  approvedApplications: VerificationRequest[] = [];
  rejectedApplications: VerificationRequest[] = [];

selectedApplication: VerificationRequest | null = null;

  // selectedApplication: VerificationRequest | null = null;
  activePanel: 'pending' | 'approved' | 'rejected' | null = 'pending'; // default to pending


  constructor(private verificationService: VerificationService) {}


  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail');
    this.userId = localStorage.getItem('userId');
  
    // Get pending
    this.verificationService.getVerifications('PENDING').subscribe({
      next: (data) => {
        this.pendingApplications = data;
        console.log('Pending:', data);
      },
      error: (err) => console.error('Error fetching pending verifications', err),
    });
  
    // Get approved
    this.verificationService.getVerifications('APPROVED').subscribe({
      next: (data) => {
        this.approvedApplications = data;
        console.log('Approved:', data);
      },
      error: (err) => console.error('Error fetching approved verifications', err),
    });
  
    // Get rejected (custom endpoint)
    this.verificationService.getRejectedVerifications().subscribe({
      next: (data) => {
        this.rejectedApplications = data;
        console.log('Rejected:', data);
      },
      error: (err) => console.error('Error fetching rejected verifications', err),
    });
  }
  
    // selectedApplication: string | null = null;
  
    openPanel(panel: 'pending' | 'approved' | 'rejected'): void {
      if (this.activePanel !== panel) {
        this.selectedApplication = null;
      }
      this.activePanel = this.activePanel === panel ? null : panel;
    }
  
    // selectApplication(appName: string): void {
    //   this.selectedApplication = appName;
    // }
  
    closeDetails(): void {
      this.selectedApplication = null;
    }

    selectApplication(app: VerificationRequest): void {
      this.selectedApplication = app;
    }


    onApplicationApproved(app: VerificationRequest) {
      this.verificationService.updateStatus(app.id, 'APPROVED').subscribe({
        next: () => {
          app.status = 'APPROVED'; // Update local object
          this.pendingApplications = this.pendingApplications.filter(a => a.id !== app.id);
          this.approvedApplications.push(app);
          this.selectedApplication = null;
          this.activePanel = 'approved';
        },
        error: (err) => {
          console.error('Error approving application:', err);
          // Optionally show a user-facing error message
        }
      });
    }
    
    
    onApplicationRejected(app: VerificationRequest) {
      this.verificationService.updateStatus(app.id, 'REJECTED').subscribe(() => {
        app.status = 'REJECTED';
        this.pendingApplications = this.pendingApplications.filter(a => a.id !== app.id);
        this.rejectedApplications.push(app);
        this.selectedApplication = null;
        this.activePanel = 'rejected';
      });
    }
    
  
}
