import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { OptionsComponent } from './Pages/options/options.component';
import { SponsorRequestComponent } from './Pages/sponsor-request/sponsor-request';
import { Fequency } from './component/fequency/fequency';
import { Register } from './component/register/register';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { VerifyEmail } from './component/verify-email/verify-email';


import { OrganiseDetailsComponent } from './Pages/organise-details/organise-details';
import { ThankYouComponent } from './Pages/thank-you/thank-you.component';
import { UploadSuccessfullyComponent } from './Pages/upload-successfully/upload-successfully.component';

import { SponsorshipRequestPage } from './Pages/sponsorship-request-page/sponsorship-request-page';
import { VerificationPage } from './Pages/verification-page/verification-page';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { DonationReviewComponent } from './component/donation-review/donation-review.component';
import { ForgotPassword } from './component/forgot-password/forgot-password';
import { OrganisationDashboardComponent } from './component/organisation-dashboard/organisation-dashboard.component';
import { ResetPassword } from './component/reset-password/reset-password';
import { SponsorDasboardComponent } from './component/sponsor-dasboard/sponsor-dasboard.component';





import { ManageSponsorComponent } from './page/manage-sponsor/manage-sponsor.component';

import { Logout } from './component/logout/logout';
import { ProfilepageComponent } from './component/profilepage/profilepage';

import { AskUploading } from './Pages/ask-uploading/ask-uploading';
import { IndividualDasboardComponent } from './component/individual-dasboard/individual-dasboard.component';
import { DonationRequest } from './donation-request/donation-request';
import { IndividualReq } from './individual-req/individual-req';

import { AdminDashComponent } from './component/admin-dash/admin-dash.component';
// import { ThankYouComponent } from './Pages/thank-you/thank-you.component';


import { PreviewIndividual } from './Pages/preview-individual/preview-individual';
import { PreviewSponsor } from './Pages/preview-sponsor/preview-sponsor';







import { ManageSponsorIndividualComponent } from './component/manage-sponsor-individual/manage-sponsor-individual.component';
import { ViewOrgPost } from './component/organisation-dashboard/view-org-post/view-org-post';
//  import { ViewOrgPostComponent } from './component/organisation-dashboard/view-org-post/view-org-post';
import { ViewIndPost } from './component/view-ind-post/view-ind-post';
 
import { ReviewRequest } from './Pages/review-request/review-request';
import { ManageSponsorIndividualComponent } from './component/manage-sponsor-individual/manage-sponsor-individual.component';
 



export const routes: Routes = [


 { path: '', redirectTo: 'Landing', pathMatch: 'full' },
  { path: 'Landing', component: LandingComponent },
  { path: 'options/:id', component: OptionsComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: Register },
  { path: 'verify-email', component: VerifyEmail },
  {path: 'sponsor-dashboard', component: SponsorDasboardComponent},
  {path: 'individual-dashboard', component: IndividualDasboardComponent},
  {path: 'sponsorship-request-page', component: SponsorshipRequestPage},
  {path: 'verification-page', component: VerificationPage},
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'auth/reset-password', component: ResetPassword },



 { path: 'organization-dashboard', component: OrganisationDashboardComponent },


  { path: 'freq', component: Fequency },


 { path: 'donation-request', component: DonationRequest },

  {path: 'sponsor-request', component: SponsorRequestComponent},
  {path: 'profile', component : ProfilepageComponent},


   { path: 'organiseDetails', component: OrganiseDetailsComponent },

  {path:'admin', component:AdminPanelComponent},
  {path:'donation-review', component: DonationReviewComponent},
  {path:'manage-sponsor', component:  ManageSponsorComponent},
   {path:'review-request', component:  ReviewRequest},
  {path: 'logout', component: Logout},
  {path:'ask-uploading', component:AskUploading},
  {path:'verification', component: VerificationPage},
  {path: 'upload-successfully', component: UploadSuccessfullyComponent},
  
  {path: 'individual-request', component: IndividualReq},

  {path:'individual-dashboard', component: IndividualDasboardComponent},
 {path: 'manage-sponsor-individual',component: ManageSponsorIndividualComponent},
  {path:'thanks', component: ThankYouComponent},
 

  {path: 'preview-sponsor/:id', component:PreviewSponsor },
   
  { path: 'review-request/:id', component: ReviewRequest },

  

  {path: 'preview-individual/:id', component:PreviewIndividual },

  
  {path:'thanks', component: ThankYouComponent},
  


  { path: 'fequency', component: Fequency },
  { path: 'donation-review', component: DonationReviewComponent },
 
  {path:'admin-dash', component: AdminDashComponent},
  {path: 'view-post/:id', component: ViewOrgPost},
  {path: 'view-indv-post/:id', component: ViewIndPost},
  // { path: '**', redirectTo: 'fequency' }


 

 ];
