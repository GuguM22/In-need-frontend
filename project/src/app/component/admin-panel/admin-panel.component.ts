import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PendingComponent } from './pending/pending.component';
import { ApprovedComponent } from './approved/approved.component';
import { RejectedComponent } from './rejected/rejected.component';
import { VerificationRequest, VerificationResponse } from '../../dto/veriificationRequest';
import { VerificationService } from '../../service/verification-service';
import { Router } from '@angular/router';
import { Services } from '../../service/services';
import { FooterComponent } from '../../ui/footer/footer';
import { Logout } from '../logout/logout';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, PendingComponent, ApprovedComponent, RejectedComponent, Logout],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
   userEmail: string | null = null;
  userId: string | null = null; 
  userName: string | null= null;
  applications: VerificationRequest[] = [];
  pendingApplications: VerificationRequest[] = [];
  approvedApplications: VerificationRequest[] = [];
  rejectedApplications: VerificationRequest[] = [];
  showConfirmModal = false;
  modalTitle = '';
  modalMessage = '';
  modalAction: (() => void) | null = null;
  showLogoutModal = false;
  toggle = true; // For sidebar toggle

selectedApplication: VerificationRequest | null = null;

  // selectedApplication: VerificationRequest | null = null;
  activePanel: 'pending' | 'approved' | 'rejected' | null = 'pending'; // default to pending


  constructor(private verificationService: VerificationService, private router: Router, private userService: Services) {}


  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail');
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
    // Get pending
    this.verificationService.getVerifications('PENDING').subscribe({
      next: (data) => {
        // Convert submittedDate strings to Date objects
        this.pendingApplications = data;  // no conversion


    this.pendingApplications.forEach(app => {
      console.log('Pending submittedDate as Date:', app.submittedDate, typeof app.submittedDate);
    });
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
  
    // selectedApplication: string | null = null
  
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


    // onApplicationApproved(app: VerificationRequest) {
    //   this.verificationService.updateStatus(app.id, 'APPROVED').subscribe({
    //     next: () => {
    //       app.status = 'APPROVED'; // Update local object
    //       this.pendingApplications = this.pendingApplications.filter(a => a.id !== app.id);
    //       this.approvedApplications.push(app);
    //       this.selectedApplication = null;
    //       this.activePanel = 'approved';
    //     },
    //     error: (err) => {
    //       console.error('Error approving application:', err);
    //     }
    //   });
    // }
    
    
    // onApplicationRejected(app: VerificationRequest) {
    //   this.verificationService.updateStatus(app.id, 'REJECTED').subscribe(() => {
    //     app.status = 'REJECTED';
    //     this.pendingApplications = this.pendingApplications.filter(a => a.id !== app.id);
    //     this.rejectedApplications.push(app);
    //     this.selectedApplication = null;
    //     this.activePanel = 'rejected';
    //   });
    // }
    
    openConfirmModal(title: string, message: string, action: () => void) {
      this.modalTitle = title;
      this.modalMessage = message;
      this.modalAction = action;
      this.showConfirmModal = true;
    }
    
    // Confirm/cancel modal
    confirmModalAction() {
      if (this.modalAction) {
        this.modalAction();
      }
      this.showConfirmModal = false;
    }
    
    cancelModal() {
      this.showConfirmModal = false;
    }

    onApplicationApproved(app: VerificationRequest) {
      this.openConfirmModal(
        'Approve Application',
        'Are you sure you want to approve this application?',
        () => {
          this.verificationService.updateStatus(app.id, 'APPROVED').subscribe({
            next: () => {
              app.status = 'APPROVED';
              this.pendingApplications = this.pendingApplications.filter(a => a.id !== app.id);
              this.approvedApplications.push(app);
              this.selectedApplication = null;
              this.activePanel = 'approved';
            },
            error: (err) => {
              console.error('Error approving application:', err);
            }
          });
        }
      );
    }
    
    onApplicationRejected(app: VerificationRequest) {
      this.openConfirmModal(
        'Reject Application',
        'Are you sure you want to reject this application?',
        () => {
          this.verificationService.updateStatus(app.id, 'REJECTED').subscribe({
            next: () => {
              app.status = 'REJECTED';
              this.pendingApplications = this.pendingApplications.filter(a => a.id !== app.id);
              this.rejectedApplications.push(app);
              this.selectedApplication = null;
              this.activePanel = 'rejected';
            },
            error: (err) => {
              console.error('Error rejecting application:', err);
            }
          });
        }
      );
    }
    

    openLogoutModal() {
      this.toggle = false; 
     this.showLogoutModal = true;
   }
 
   closeLogoutModal() {
     this.showLogoutModal = false;
   }
 
   confirmLogout() {
     this.userService.logout().subscribe({
       next: () => {
         this.showLogoutModal = false;
         this.router.navigate(['/sign-in']);
       },
       error: (err) => {
         console.error('Logout failed:', err);
         this.router.navigate(['/sign-in']);
       },
     });
   }
 
}
