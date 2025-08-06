import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { Register } from './component/register/register';
import { VerifyEmail } from './component/verify-email/verify-email';
import { SponsorDasboardComponent } from './component/sponsor-dasboard/sponsor-dasboard.component';
import { IndividualDasboardComponent } from './component/individual-dasboard/individual-dasboard.component';
import { DonationReq } from './Pages/donation-req/donation-req';
import { ReviewReq } from './Pages/review-req/review-req';

export const routes: Routes = [
  { path: '', redirectTo: 'Landing', pathMatch: 'full' },
    { path: 'donation-req', component: DonationReq },
      { path: 'review-req', component: ReviewReq },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },
  { path: 'Landing', component: LandingComponent },
  {path: 'sponsor-dashboard',component: SponsorDasboardComponent},
  {path: 'individual-dashboard',component: IndividualDasboardComponent},
];
