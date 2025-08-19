import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-approved',
  imports: [CommonModule],
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.css'
})
export class ApprovedComponent {


  @Input() application: any;
  @Output() close = new EventEmitter<void>();


  //  selectedApplication: string | null = null;

   
  //  selectApplication(appName: string): void {
  //   this.selectedApplication = appName;
  // }

  closeDetails(): void {
    this.close.emit();  
  }
  downloadDocument(fileName: string): void {
    const url = `http://localhost:5050/api/verify/download/${fileName}`;
    window.open(url, '_blank');
  }
  
  
}
