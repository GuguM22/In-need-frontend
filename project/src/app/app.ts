import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { NavbarComponent } from './ui/navbar/navbar';
import { Sidebar } from './ui/sidebar/sidebar';
import { FooterComponent } from './ui/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'project';
}