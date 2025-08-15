import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Needed for routerLink
import { FooterComponent } from "../../ui/footer/footer";
import { Navbar } from "../../ui/navbar/navbar";
import { Services } from '../../service/services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,   
  ],
  providers: [Services],
  templateUrl: './profilepage.html',
})
export class ProfilepageComponent implements OnInit {
  viewDocument(arg0: string) {
    throw new Error('Method not implemented.');
  }
  isEditing = false;

  constructor(private location: Location, private service: Services) {}

  ngOnInit() {
    this.service.profile().subscribe((data: any) => {
      this.name = this.capitalizeFirstLetter(data.name);
      this.email = this.capitalizeFirstLetter(data.email);
      this.bio = data.bio;
      this.phone = data.phone || 'Not verified yet';
      if (data.location) {
        this.Location =  this.capitalizeFirstLetter(data.location.city) + ', ' + this.capitalizeFirstLetter(data.location.province);
      }
    });
  }

  // Displayed profile data
  name = '';
  email = '';
  phone = '';
  bio = '';
  Location = '';

  // Temporary edit copies
  editName = this.name;
  editEmail = this.email;
  editPhone = this.phone;
  editBio = this.bio;
  editLocation = this.Location;
  cipcFile: any;
  founderIdFile: any;
  additionalFile: any;

  toggleEdit() {
  if (this.isEditing) {
    // Save changes to backend
    const updateData = {
      bio: this.editBio,
      location: {
        city: this.editLocation.split(',')[0]?.trim() || '',
        province: this.editLocation.split(',')[1]?.trim() || ''
      }
    };

    this.service.updateProfile(updateData).subscribe({
      next: (res) => {
        console.log('Profile updated:', res);
        // Update local view after successful save
        this.name = this.editName;
        this.email = this.editEmail;
        this.phone = this.editPhone;
        this.bio = this.editBio;
        this.Location = this.editLocation;
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update profile');
      }
    });
  } else {
    this.editName = this.name;
    this.editEmail = this.email;
    this.editPhone = this.phone;
    this.editBio = this.bio;
    this.editLocation = this.Location;
  }

  this.isEditing = !this.isEditing;
}

private capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
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

