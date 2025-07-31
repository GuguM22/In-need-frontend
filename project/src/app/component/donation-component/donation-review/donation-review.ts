import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donation-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donation-review.html',
  styleUrl: './donation-review.css'
})
export class DonationReview {
@Input() data!: any;
@Output() next = new EventEmitter<any>();

selectedType: string = '';

proceed() {
  this.next.emit({ type: this.selectedType });
}
}