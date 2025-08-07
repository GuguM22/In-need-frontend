import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-upload-successfully',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './upload-successfully.component.html',
  styleUrls: ['./upload-successfully.component.css']
})
export class UploadSuccessfullyComponent {

  constructor(private router: Router){}
}
