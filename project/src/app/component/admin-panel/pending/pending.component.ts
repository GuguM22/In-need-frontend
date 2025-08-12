import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pending',
  imports: [],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css'
})
export class PendingComponent {

  @Input() application: any;
  @Output() close = new EventEmitter<void>();

  // Track the selected application for detailed view
  selectedApplication: string | null = null;

   
  // Set the selected application to show detailed view
  selectApplication(appName: string): void {
    this.selectedApplication = appName;
  }

  closeDetails(): void {
    this.close.emit(); // 🔴 This is what notifies the parent!
  }
}
