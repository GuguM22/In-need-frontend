import { Component } from '@angular/core';
import { Navbar } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";

@Component({
  selector: 'app-review-request',
  imports: [Navbar, FooterComponent],
  templateUrl: './review-request.html',
  styleUrl: './review-request.css'
})
export class ReviewRequest {

}
