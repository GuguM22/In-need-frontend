import { Component } from '@angular/core';
import {  NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";

@Component({
  selector: 'app-review-request',
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './review-request.html',
  styleUrl: './review-request.css'
})
export class ReviewRequest {

}
