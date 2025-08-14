
import { Component } from '@angular/core';
import { Navbar } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";
import { Router } from '@angular/router';



@Component({
  selector: 'app-ask-uploading',
  imports: [Navbar, FooterComponent],
  templateUrl: './ask-uploading.html',
  styleUrls: ['./ask-uploading.css']
})
export class AskUploading {

  constructor(private router: Router){}

    goVerification() {
  this.router.navigate(['/verification']);
}
}
