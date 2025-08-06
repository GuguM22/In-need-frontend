import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-approved',
  imports: [],
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.css'
})
export class ApprovedComponent {


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
