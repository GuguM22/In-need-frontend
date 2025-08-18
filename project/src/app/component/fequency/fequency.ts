import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  NavbarComponent } from "../../ui/navbar/navbar";
import { FooterComponent } from "../../ui/footer/footer";

@Component({
  selector: 'app-fequency',
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './fequency.html',
  styleUrl: './fequency.css'
})
export class Fequency {
  frequencyTiles = [
    {
      icon: "icons/digitalwatch.svg",
      icon1: "icons/onetimedonation.svg",
      title: "On Time Donatione",
      description: "Make a single donation now"
    },
    {
      icon: "icons/analogwatch.svg",
      icon1: "icons/weekly.svg",
      title: "Weekly",
      description: "Donate once a week"
    },
    {
      icon: "icons/monthlycalender.svg",
      icon1: "icons/monthly.svg",
      title: "Monthly",
      description: "Donate monthly"
    },
    {
      icon: "icons/yearlycalender.svg",
      icon1: "icons/yearly.svg",
      title: "One Time",
      description: "Single donation"
    }
  ];
}
