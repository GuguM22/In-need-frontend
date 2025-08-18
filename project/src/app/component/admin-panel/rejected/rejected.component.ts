import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerificationRequest, VerificationResponse } from '../../../dto/veriificationRequest';
import { VerificationService } from '../../../service/verification-service';

@Component({
  selector: 'app-rejected',
  imports: [],
  templateUrl: './rejected.component.html',
  styleUrl: './rejected.component.css'
})
export class RejectedComponent {

  rejectedApplications: VerificationRequest[] = [];
  selectedApplication: VerificationRequest | null = null;
  @Input() application!: VerificationRequest;
  @Output() close = new EventEmitter<void>();

  constructor(private verificationService: VerificationService) {}

  ngOnInit(): void {
    this.loadRejectedApplications();
  }

  loadRejectedApplications(): void {
    this.verificationService.getRejectedVerifications().subscribe(
      (data) => {
        this.rejectedApplications = data;
      },
      (error) => {
        console.error('Error loading rejected verifications', error);
      }
    );
  }

  selectApplication(app: VerificationRequest): void {
    this.selectedApplication = app;
  }

  closeDetails(): void {
    this.close.emit();
  }

}
