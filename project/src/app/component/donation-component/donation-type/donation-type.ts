import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donation-type',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donation-type.html',
  styleUrls: ['./donation-type.css']
})
export class DonationType {
@Input() data!: any;
@Output() next = new EventEmitter<any>();
@Output() back = new EventEmitter<any>()

selectedType: string = '';

proceed() {
  this.next.emit({ type: this.selectedType });
}
cancel() {  
 this.back.emit();;
}
}
