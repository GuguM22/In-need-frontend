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
import { SponsorshipRequestPage } from './Pages/sponsorship-request-page/sponsorship-request-page';
import { ForgotPassword } from './component/forgot-password/forgot-password';
import { SponsorDasboardComponent } from './component/sponsor-dasboard/sponsor-dasboard.component';
import { ResetPassword } from './component/reset-password/reset-password';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { DonationReviewComponent } from './component/donation-review/donation-review.component';
import { OrganisationDashboardComponent } from './component/organisation-dashboard/organisation-dashboard.component';
import { Logout } from './component/logout/logout';

export const routes: Routes = [
  { path: '', redirectTo: 'Landing', pathMatch: 'full' },

  { path: 'Landing', component: LandingComponent },

  { path: 'sponsor-req', component: SponsorRequest },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },
  { path: 'sponsor-dashboard', component: SponsorDasboardComponent },
  { path: 'verification-page', component: VerificationPage },
  { path: 'sponsorship-request-page', component: SponsorshipRequestPage },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'auth/reset-password', component: ResetPassword },
  //{ path: '', component: LandingComponent },

  { path: 'sponsor-dashboard', component: SponsorDasboardComponent },
  { path: 'organization-dashboard', component: OrganisationDashboardComponent },

  { path: 'freq', component: Fequency },

  { path: 'options', component: OptionsComponent },
  { path: 'organiseDetails', component: OrganiseDetailsComponent },

  { path: 'admin', component: AdminPanelComponent },
  { path: 'donation-review', component: DonationReviewComponent },
  {path: 'logout', component: Logout},
];
