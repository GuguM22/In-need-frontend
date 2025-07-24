
import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './component/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
   { path: 'Landing', component: LandingComponent }
];


