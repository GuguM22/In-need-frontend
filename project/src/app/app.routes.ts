import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { Register } from './component/register/register';
import { VerifyEmail } from './component/verify-email/verify-email';
import { SponsorRequest } from './Pages/sponsor-request/sponsor-request';
import { Fequency } from './component/fequency/fequency';




  import { ProfilepageComponent } from './component/profilepage/profilepage';


 


import { OptionsComponent } from './Pages/options/options.component';
import { from } from 'rxjs';
import { OrganiseDetailsComponent } from './Pages/organise-details/organise-details';

import { VerificationPage } from './Pages/verification-page/verification-page';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { DonationReviewComponent } from './component/donation-review/donation-review.component';
import { SponsorDasboardComponent } from './component/sponsor-dasboard/sponsor-dasboard.component';
import { OrganisationDashboardComponent } from './component/organisation-dashboard/organisation-dashboard.component';
import { ForgotPassword } from './component/forgot-password/forgot-password';
import { ResetPassword } from './component/reset-password/reset-password';






export const routes: Routes = [


  { path: '', redirectTo: 'Landing', pathMatch: 'full' },

  { path: 'Landing', component: LandingComponent },
 
  { path: 'sponsor-req', component: SponsorRequest },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },
   { path: 'sponsor-dashboard', component: SponsorDasboardComponent },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'auth/reset-password', component: ResetPassword },
  { path: '', component: LandingComponent },

   {path: 'sponsor-dashboard', component: SponsorDasboardComponent},
   {path: 'organization-dashboard', component: OrganisationDashboardComponent},

  {path: 'options', component:OptionsComponent},
     {path: 'verification-page', component: VerificationPage},
 



  {path: 'freq',component:Fequency},
 
  {path: 'req', component: SponsorRequest},
  {path: 'profile', component :ProfilepageComponent},
 



   { path: 'organiseDetails', component: OrganiseDetailsComponent },

   {path:'admin', component:AdminPanelComponent},
  {path:'donation-review', component: DonationReviewComponent}
];







 


