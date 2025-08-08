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
import { ProfilepageComponent } from './component/profilepage/profilepage';







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

  {path: 'req', component: SponsorRequest}

];
