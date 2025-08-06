import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { Register } from './component/register/register';
import { VerifyEmail } from './component/verify-email/verify-email';
import { SponsorDasboardComponent } from './component/sponsor-dasboard/sponsor-dasboard.component';
import { IndividualDasboardComponent } from './component/individual-dasboard/individual-dasboard.component';

import { ResetPassword } from './component/reset-password/reset-password';
import { OrganisationDashboardComponent } from './component/organisation-dashboard/organisation-dashboard.component';
import { ForgotPassword } from './component/forgot-password/forgot-password';
import { SponsorRequest } from './Pages/sponsor-request/sponsor-request';
import { Fequency } from './component/fequency/fequency';





import { OptionsComponent } from './Pages/options/options.component';
import { from } from 'rxjs';
import { OrganiseDetailsComponent } from './Pages/organise-details/organise-details';

import { VerificationPage } from './Pages/verification-page/verification-page';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { DonationReviewComponent } from './component/donation-review/donation-review.component';



export const routes: Routes = [
 
  { path: '', redirectTo: 'Landing', pathMatch: 'full' },
  
  { path: 'sponsor-req', component: SponsorRequest },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },
   {path: 'sponsor-dashboard', component: SponsorDasboardComponent},
   {path: 'verification-page', component: VerificationPage},
  

  // { path: '', component: LandingComponent },
  {path: 'freq',component:Fequency},

 { path: 'options', component: OptionsComponent },
  { path: 'organise-details', component: OrganiseDetailsComponent },
  { path: '', redirectTo: 'Landing', pathMatch: 'full' },
   {path:'admin', component:AdminPanelComponent},
  {path:'donation-review', component: DonationReviewComponent}
];







 


