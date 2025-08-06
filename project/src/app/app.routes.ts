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
import { from } from 'rxjs';
import { OrganiseDetailsComponent } from './Pages/organise-details/organise-details';





export const routes: Routes = [
  { path: '', redirectTo: 'Landing', pathMatch: 'full' },
 
  { path: 'sponsor-req', component: SponsorRequest },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },

  { path: '', component: LandingComponent },
 { path: 'options', component: OptionsComponent },
  { path: 'organise-details', component: OrganiseDetailsComponent },
  { path: '', redirectTo: 'Landing', pathMatch: 'full' }
];







