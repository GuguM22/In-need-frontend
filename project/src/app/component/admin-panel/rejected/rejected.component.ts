import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerificationRequest, VerificationResponse } from '../../../dto/veriificationRequest';
import { VerificationService } from '../../../service/verification-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rejected',
  imports: [CommonModule],
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

  downloadDocument(fileName: string): void {
    const url = `http://localhost:5050/api/verify/download/${fileName}`;
    window.open(url, '_blank');
  }

}
