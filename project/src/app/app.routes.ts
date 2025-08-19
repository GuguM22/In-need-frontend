import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { Register } from './component/register/register';
import { VerifyEmail } from './component/verify-email/verify-email';
import { SponsorRequest, SponsorRequestComponent } from './Pages/sponsor-request/sponsor-request';
import { Fequency } from './component/fequency/fequency';
import { OptionsComponent } from './Pages/options/options.component';



import { UploadSuccessfullyComponent } from './Pages/upload-successfully/upload-successfully.component';
import { ThankYouComponent } from './Pages/thank-you/thank-you.component';
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

import { ManageSponsorComponent } from './page/manage-sponsor/manage-sponsor.component';

import { Logout } from './component/logout/logout';
import { ProfilepageComponent } from './component/profilepage/profilepage';

import { Navbar } from './ui/navbar/navbar';
import { AskUploading } from './Pages/ask-uploading/ask-uploading';
import { DonationRequest } from './donation-request/donation-request';
import { IndividualDasboardComponent } from './component/individual-dasboard/individual-dasboard.component';

import { IndividualReq } from './individual-req/individual-req';
import { PreviewSponsor } from './Pages/preview-sponsor/preview-sponsor';








export const routes: Routes = [
  { path: '', redirectTo: 'Landing', pathMatch: 'full' },


  { path: 'Landing', component: LandingComponent },
  {path: 'options', component:OptionsComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },

  {path: 'sponsor-dashboard', component: SponsorDasboardComponent},

 
  {path: 'sponsorship-request-page', component: SponsorshipRequestPage},
  {path: 'verification-page', component: VerificationPage},


 
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'auth/reset-password', component: ResetPassword },


 { path: 'organization-dashboard', component: OrganisationDashboardComponent },


  { path: 'freq', component: Fequency },


 { path: 'donation-request', component: DonationRequest },

  {path: 'sponsor-request', component: SponsorRequestComponent},
  {path: 'profile', component :ProfilepageComponent},

   { path: 'organiseDetails', component: OrganiseDetailsComponent },

   {path:'admin', component:AdminPanelComponent},
  {path:'donation-review', component: DonationReviewComponent},
  {path:'manage-sponsor', component:  ManageSponsorComponent},

  {path: 'logout', component: Logout},
  {path:'ask-uploading', component:AskUploading},
  {path:'verification', component: VerificationPage},
  {path: 'upload-successfully', component: UploadSuccessfullyComponent},
  
  {path: 'individual-request', component: IndividualReq},
 
  {path:'individual-dashboard', component: IndividualDasboardComponent},
  {path: 'preview-sponsor/:id', component:PreviewSponsor },
  
 
];
