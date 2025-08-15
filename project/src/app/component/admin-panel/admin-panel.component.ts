import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PendingComponent } from './pending/pending.component';
import { ApprovedComponent } from './approved/approved.component';
import { RejectedComponent } from './rejected/rejected.component';
import { VerificationRequest } from '../../dto/veriificationRequest';
import { VerificationService } from '../../service/verification-service';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, PendingComponent, ApprovedComponent, RejectedComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

  constructor(private verificationService: VerificationService) {}


  ngOnInit(): void {
    this.verificationService.getVerifications('PENDING').subscribe({
      next: (data) => {
        console.log('Verifications fetched:', data);  // added console.log
        this.applications = data;
      },
      error: (err) => console.error('Error fetching pending verifications', err)
    });
  }

  activePanel: 'pending' | 'approved' | 'rejected' | null = null;

    selectedApplication: string | null = null;
  
    openPanel(panel: 'pending' | 'approved' | 'rejected'): void {
      if (this.activePanel !== panel) {
        this.selectedApplication = null;
      }
      this.activePanel = this.activePanel === panel ? null : panel;
    }
  
    selectApplication(appName: string): void {
      this.selectedApplication = appName;
    }
  
    closeDetails(): void {
      this.selectedApplication = null;
    }

    applications: VerificationRequest[] = [];


}
