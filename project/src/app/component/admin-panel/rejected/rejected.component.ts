import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rejected',
  imports: [],
  templateUrl: './rejected.component.html',
  styleUrl: './rejected.component.css'
})
export class RejectedComponent {

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
