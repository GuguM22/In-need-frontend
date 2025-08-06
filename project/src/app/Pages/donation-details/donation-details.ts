import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.html',
})
export class DonationDetailsComponent {
  @Input() data!: any;
  @Output() next = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();

  selectedType: string = '';
  

  proceed() {
    this.next.emit({ type: this.selectedType });
  }

  cancel() {
    this.back.emit();
  }
}
