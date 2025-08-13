import { Component, EventEmitter, Output } from '@angular/core';
import { Services } from '../../service/services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  providers: [Services],
  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})
export class Logout {

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  constructor(private router: Router) {}

  onCancelSignOut() {
    this.cancel.emit();
     //this.router.navigate(['/discover']);
  }

  onConfirmSignOut() {
    this.confirm.emit();
  }
}
