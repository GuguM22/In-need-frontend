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
activeTab: any;
dashboardRoute: string = '/';

  constructor(private router: Router){}

  ngOnInit(): void {

    const role = localStorage.getItem('userRole');
    switch (role) {
      case 'SPONSORS':
        this.dashboardRoute = '/sponsor-dashboard';
        break;
      case 'ORGANIZATION':
        this.dashboardRoute = '/organization-dashboard';
        break;
      case 'INDIVIDUAL':
        this.dashboardRoute = '/individual-dashboard';
        break;
      case 'ADMIN':
        this.dashboardRoute = '/admin';
        break;
      default:
        this.dashboardRoute = '/individual-dashboard';
    }
  }
}
