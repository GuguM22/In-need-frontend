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

import { OptionsComponent } from './Pages/options/options.component';
import { VerificationPage } from './Pages/verification-page/verification-page';
import { SponsorshipRequestPage } from './Pages/sponsorship-request-page/sponsorship-request-page';


export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },

  { path: 'sponsor-req', component: SponsorRequest },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },
  { path: 'sponsor-dashboard', component: SponsorDasboardComponent },
  { path: 'verification-page', component: VerificationPage },
  { path: 'sponsorship-request-page', component: SponsorshipRequestPage },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'auth/reset-password', component: ResetPassword },
  { path: '', component: LandingComponent },

];
