import { Component } from '@angular/core';
import { FooterComponent } from "../../ui/footer/footer";
import { NavbarComponent } from "../../ui/navbar/navbar";
import { Sidebar } from "../../ui/sidebar/sidebar";

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.html',
  styleUrls: ['./profilepage.css'],
  imports: [FooterComponent, NavbarComponent]
})
export class ProfilepageComponent {
  name = 'Hopewll Mthunzi';
  email = 'hope.mthunzim5@gmail.com';
  phone = '+27 123 456 789';
  bio = 'Passionate about helping communities grow. Interested in education and health support';
  totalDonations: number =17;
  Location = 'J507 Mgonswane Road, Kwa-Mashu'
  
  getBadge(): string {
  if (this.totalDonations === 0) {
    return '🐣 Newcomer';
  } else if (this.totalDonations <= 5) {
    return '🌱 Starter';
  } else if (this.totalDonations <= 15) {
    return '🌟 Supporter';
  } else if (this.totalDonations <= 30) {
    return '💖 Giver';
  } else {
    return '🏆 Champion';
     return '🏆 Champion';
  }
}


}
