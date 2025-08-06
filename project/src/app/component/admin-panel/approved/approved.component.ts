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


   selectedApplication: string | null = null;

   
   selectApplication(appName: string): void {
    this.selectedApplication = appName;
  }

  closeDetails(): void {
    this.close.emit();  
  }
}
