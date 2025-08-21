import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdminPanelComponent } from "../admin-panel/admin-panel.component";
import { VerificationRequest } from '../../dto/veriificationRequest';

@Component({
  selector: 'app-admin-dash',
  imports: [CommonModule],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {
  isSidebarContentOpen = false;
  @Input() pendingApplications: VerificationRequest[] = [];
  @Input() approvedApplications: VerificationRequest[] = [];
  @Input() rejectedApplications: VerificationRequest[] = [];
  @Input() recentActivities: VerificationRequest[] = [];

  pendingChange: number = 0;
approvedChange: number = 0;
rejectedChange: number = 0;

}


