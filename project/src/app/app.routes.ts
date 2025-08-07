import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { Register } from './component/register/register';
import { VerifyEmail } from './component/verify-email/verify-email';
import { SponsorRequest } from './Pages/sponsor-request/sponsor-request';
import { Fequency } from './component/fequency/fequency';






import { OptionsComponent } from './Pages/options/options.component';
import { from } from 'rxjs';
import { OrganiseDetailsComponent } from './Pages/organise-details/organise-details';

import { VerificationPage } from './Pages/verification-page/verification-page';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { DonationReviewComponent } from './component/donation-review/donation-review.component';



export const routes: Routes = [


  { path: '', redirectTo: 'organiseDetails', pathMatch: 'full' },
  { path: 'Landing', component: LandingComponent },


 

  

  { path: 'sponsor-req', component: SponsorRequest },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },
   {path: 'sponsor-dashboard', component: SponsorDasboardComponent},
   {path: 'verification-page', component: VerificationPage},
   {path: 'organization-dashboard', component: OrganisationDashboardComponent},




  {path: 'freq',component:Fequency},


 { path: 'options', component: OptionsComponent },
  { path: 'organiseDetails', component: OrganiseDetailsComponent },

   {path:'admin', component:AdminPanelComponent},
  {path:'donation-review', component: DonationReviewComponent}
];







 


