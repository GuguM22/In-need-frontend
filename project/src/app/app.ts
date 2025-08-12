import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./ui/footer/footer";
 
import { Sidebar } from "./ui/sidebar/sidebar"; 
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-root',
 
 
  standalone: true,

  imports: [CommonModule, RouterModule],

   templateUrl: './app.html',

  styleUrls: ['./app.css']
 })
export class App {
  protected title = 'project';

  
}
