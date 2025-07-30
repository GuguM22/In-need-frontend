import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { Register } from './component/register/register';
import { VerifyEmail } from './component/verify-email/verify-email';
import { SponsorDasboardComponent } from './component/sponsor-dasboard/sponsor-dasboard.component';
import { IndividualDasboardComponent } from './component/individual-dasboard/individual-dasboard.component';
import { ForgotPassword } from './component/forgot-password/forgot-password';
import { OrganisationDashboardComponent } from './component/organisation-dashboard/organisation-dashboard.component';
import { ResetPassword } from './component/reset-password/reset-password';
import { SponsorRequest } from './Pages/sponsor-request/sponsor-request';



export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
 
  { path: 'sponsor-req', component: SponsorRequest },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },
  { path: 'landing', component: LandingComponent },

  
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'auth/reset-password', component: ResetPassword },
  {path: 'sponsor-dashboard',component: SponsorDasboardComponent},
  {path: 'individual-dashboard',component: IndividualDasboardComponent},
  {path: 'organisation-dashboard', component: OrganisationDashboardComponent},
  {  path: 'req', component: SponsorRequest}
];
