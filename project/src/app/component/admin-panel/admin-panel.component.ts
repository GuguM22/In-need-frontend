import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PendingComponent } from './pending/pending.component';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, PendingComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

    // Track which panel is currently active
    activePanel: 'pending' | 'approved' | 'rejected' | null = null;

    // Track the selected application for detailed view
    selectedApplication: string | null = null;
  
    // Open or toggle panel visibility
    openPanel(panel: 'pending' | 'approved' | 'rejected'): void {
      // Reset selected application when switching panels
      if (this.activePanel !== panel) {
        this.selectedApplication = null;
      }
      this.activePanel = this.activePanel === panel ? null : panel;
    }
  
    // Set the selected application to show detailed view
    selectApplication(appName: string): void {
      this.selectedApplication = appName;
    }
  
    // Close the detailed view
    closeDetails(): void {
      this.selectedApplication = null;
    }

}
