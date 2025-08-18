import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Needed for routerLink
import { FooterComponent } from "../../ui/footer/footer";


@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,   // ✅ Add this
  ],
  templateUrl: './profilepage.html',



  
})
export class ProfilepageComponent {
viewDocument(arg0: string) {
throw new Error('Method not implemented.');
}
  isEditing = false;

  // Displayed profile data
  name = 'Hopewell Mthunzi';
  email = 'hopewell@example.com';
  phone = '+27 82 123 4567';
  bio = 'Helping since 2020, passionate about making a difference.';
  Location = 'Johannesburg, South Africa';

  // Temporary edit copies
  editName = this.name;
  editEmail = this.email;
  editPhone = this.phone;
  editBio = this.bio;
  editLocation = this.Location;
  cipcFile: any;
  founderIdFile: any;
  additionalFile: any;

  constructor(private location: Location) {}

  toggleEdit() {
    if (this.isEditing) {
      // Save changes
      this.name = this.editName;
      this.email = this.editEmail;
      this.phone = this.editPhone;
      this.bio = this.editBio;
      this.Location = this.editLocation;
    } else {
      // Load existing values into form
      this.editName = this.name;
      this.editEmail = this.email;
      this.editPhone = this.phone;
      this.editBio = this.bio;
      this.editLocation = this.Location;
    }
    this.isEditing = !this.isEditing;
  }

  goBack() {
    this.location.back();
  }
  // Array to store uploaded files
uploadedFiles: File[] = [];

// Method to handle file selection
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  // Convert FileList to Array
  this.uploadedFiles = Array.from(input.files);
    if (this.isEditing) {
    // Cancel editing and return to view mode
    this.isEditing = false;

    // Optionally, reset the edit fields if you want to discard changes
    this.editName = this.name;
    this.editEmail = this.email;
    this.editPhone = this.phone;
    this.editBio = this.bio;
    this.editLocation = this.Location;
    // Optionally reset document files if you allow canceling edits
  } else {
    // Actually go back in browser history
    this.location.back(); // make sure you injected Location from @angular/common
  }
}
updateDocument(event: any, docType: string) {
  const file = event.target.files[0];
  if (!file) return;

  switch(docType) {
    case 'cipc':
      this.cipcFile = file; // store locally or upload
      break;
    case 'founderId':
      this.founderIdFile = file;
      break;
    case 'additional':
      this.additionalFile = file;
      break;
  }

  // Optionally: update uploadedFiles array if you display all files
  this.uploadedFiles.push(file);
}




}
