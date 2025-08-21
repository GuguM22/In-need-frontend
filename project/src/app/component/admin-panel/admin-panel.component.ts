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
import { AdminDashComponent } from "../admin-dash/admin-dash.component";
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, PendingComponent, ApprovedComponent, RejectedComponent, Logout, AdminDashComponent],
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
  recentActivities: VerificationRequest[] = []; 
  showConfirmModal = false;
  modalTitle = '';
  modalMessage = '';
  modalAction: (() => void) | null = null;
  showLogoutModal = false;
  toggle = true; 

selectedApplication: VerificationRequest | null = null;

  activePanel: 'pending' | 'approved' | 'rejected' | null = 'pending'; // default to pending


  constructor(private verificationService: VerificationService, private router: Router, private userService: Services) {}


// ngOnInit(): void {
//   this.userEmail = localStorage.getItem('userEmail');
//   this.userId = localStorage.getItem('userId');
//   this.userName = localStorage.getItem('userName');

//   combineLatest([
//     this.verificationService.getVerifications('PENDING'),
//     this.verificationService.getVerifications('APPROVED'),
//     this.verificationService.getRejectedVerifications()
//   ]).subscribe({
//     next: ([pending, approved, rejected]) => {
//       this.pendingApplications = pending;
//       this.approvedApplications = approved;
//       this.rejectedApplications = rejected;

//       this.recentActivities = [...pending, ...approved, ...rejected]
//       .filter(app => !!app.submittedDate) 
//       .sort((a, b) =>
//         new Date(b.submittedDate as string).getTime() - new Date(a.submittedDate as string).getTime()
//       );
    

//       console.log('Recent activities:', this.recentActivities);
//     },
//     error: (err) => {
//       console.error('Error fetching verification data:', err);
//     }
//   });
// }
  

ngOnInit(): void {
  this.userEmail = localStorage.getItem('userEmail');
  this.userId = localStorage.getItem('userId');
  this.userName = localStorage.getItem('userName');

  combineLatest([
    this.verificationService.getVerifications('PENDING'),
    this.verificationService.getVerifications('APPROVED'),
    this.verificationService.getRejectedVerifications()
  ]).subscribe({
    next: ([pending, approved, rejected]) => {
      // Sort each list by submittedDate (newest first)
      this.pendingApplications = pending
        .filter(app => !!app.submittedDate)
        .sort((a, b) => new Date(b.submittedDate as string).getTime() - new Date(a.submittedDate as string).getTime());

      this.approvedApplications = approved
        .filter(app => !!app.submittedDate)
        .sort((a, b) => new Date(b.submittedDate as string).getTime() - new Date(a.submittedDate as string).getTime());

      this.rejectedApplications = rejected
        .filter(app => !!app.submittedDate)
        .sort((a, b) => new Date(b.submittedDate as string).getTime() - new Date(a.submittedDate as string).getTime());

      // For recent activities (optional)
      this.recentActivities = [...this.pendingApplications, ...this.approvedApplications, ...this.rejectedApplications];
    },
    error: (err) => {
      console.error('Error fetching verification data:', err);
    }
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
