import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-upload-successfullyindividual',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './upload-successfully-individual.component.html',
  styleUrls: ['./upload-successfully-individual.component.css']
})
export class UploadSuccessfullyindividualComponent {

  constructor(private router: Router){}
}
