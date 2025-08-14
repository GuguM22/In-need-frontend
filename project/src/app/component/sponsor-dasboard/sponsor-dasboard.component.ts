import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from "../../ui/navbar/navbar";
import { FooterComponent } from '../../ui/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sponsor-dasboard',
  standalone: true,
  imports: [CommonModule, Navbar, FooterComponent, RouterLink],
  templateUrl: './sponsor-dasboard.component.html',
  styleUrls: ['./sponsor-dasboard.component.css']
})
export class SponsorDasboardComponent {

}
