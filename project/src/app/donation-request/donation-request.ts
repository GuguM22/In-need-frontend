import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-donation-request',
  imports: [CommonModule],
  templateUrl: './donation-request.html',
  styleUrl: './donation-request.css'
})


export class DonationRequest {
[x: string]: any;
onAvailabilityChange(arg0: boolean) {
throw new Error('Method not implemented.');
}
sponsorshipForm: any;
goBack() {
throw new Error('Method not implemented.');
}
onQuantityChange(increment: boolean): void {
    const currentValue = this.sponsorshipForm.get('quantity')?.value || 0;
    const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);
    this.sponsorshipForm.patchValue({ quantity: newValue });
  }

}
