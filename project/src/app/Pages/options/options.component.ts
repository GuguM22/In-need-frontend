import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SponsorRequestService } from '../../service/sponsor-request-service';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from "../../ui/navbar/navbar";
import { Loader } from '../../ui/loader/loader';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent, Loader],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  showError: boolean = false;
  errorMessage: string = '';
  currentStep: number = 1;
  totalSteps: number = 3;
  selectedType: string = "";
  requestId: string = '';
  requestDetails: any;
  dashboardRoute: string = '/'; // fallback default
  isLoading = true;

  donationOptions = [
    {
      label: 'Food Donations',
      value: 'food',
      description: 'Fresh foods, groceries, or packaged food items',
      icon: '🍞'
    },
    {
      label: 'Item Donations',
      value: 'item',
      description: 'Clothing, household material, or personal items',
      icon: '👕'
    },
    {
      label: 'Service Donations',
      value: 'service',
      description: 'Volunteering or offering a helpful service',
      icon: '🤝'
    }
  ];

  constructor(
    private router: Router,  
    private route: ActivatedRoute,
    private sponsorService: SponsorRequestService
  ) {
    setTimeout(() =>{
      this.isLoading = false}, 1000
    )
  }

  get isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  selectType(type: string) {
    this.selectedType = type;
    this.showError = false; 
  }

  goNext(): void {
    if (this.selectedType === "") {
      this.showError = true;
      this.errorMessage = "Please select a donation type to continue.";
      return;
    }

    sessionStorage.setItem('donationType', this.selectedType);
    this.router.navigate(['/donation-request', this.requestId]);
  }

  goBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showError = false;
    } else {
      // Navigate to dashboard based on user role
     const role = sessionStorage.getItem('userRole');

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
    this.router.navigate([this.dashboardRoute]);
  } 
    
  }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.requestId) {
      console.error('No request ID provided in URL!');
      return;
    }

    this.sponsorService.getById(this.requestId).subscribe({
      next: (data) => this.requestDetails = data,
      error: (err) => console.error('Error fetching request details:', err)
    });

    // Set dashboard route based on user role
  /*  const role = sessionStorage.getItem('userRole');
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
    }*/
  }
}

