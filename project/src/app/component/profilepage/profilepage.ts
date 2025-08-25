import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { FooterComponent } from "../../ui/footer/footer";
import { Services } from '../../service/services';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DonationService } from '../../service/donation-service';
import { Role } from '../../constant/role';
import { NavbarComponent } from "../../ui/navbar/navbar";

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FooterComponent,
    NavbarComponent
],
  providers: [Services],
  templateUrl: './profilepage.html',
})
export class ProfilepageComponent implements OnInit {
  isEditing = false;
  profileImageUrl: string | ArrayBuffer | null = null;
  uploading = false;
  isSponsor = false;

  role = Role.SPONSORS || Role.INDIVIDUAL;


  constructor(private location: Location, private service: Services) {}

ngOnInit() {
  this.service.profile().subscribe({
    next: (data: any) => {
      this.name = data.name || '';
      this.email = data.email || '';
      this.bio = data.bio || '';
      
      // Handle phone number based on role
      this.isSponsor = data.role?.toUpperCase() === Role.SPONSORS || data.role?.toUpperCase() === Role.INDIVIDUAL;
      this.phone = this.isSponsor ? 'Not applicable' : (data.phone || 'Not verified yet');
      
      // Handle location - more robust handling
      if (data.location) {
        // Check if location is already a string
        if (typeof data.location === 'string') {
          this.Location = data.location;
        } 
        // Check if location is an object with city/province
        else if (data.location.city || data.location.province) {
          this.Location = [data.location.city, data.location.province]
            .filter(Boolean).join(', ');
        }
        // Handle other possible location formats
        else {
          this.Location = 'Location not specified';
        }
      } else {
        this.Location = 'Location not specified';
      }

      // Initialize editLocation with the current location
      this.editLocation = this.Location;

      // Load profile image if available
      if (data.profileImagePath) {
        this.loadProfileImage(data.profileImagePath);
      }
    },
    error: (err) => console.error('Failed to load profile', err)
  });
}

private loadProfileImage(imagePath: string) {
  this.service.getProfileImage(imagePath).subscribe({
    next: (blob) => {
      if (blob.size > 0) {
        this.profileImageUrl = URL.createObjectURL(blob);
      } else {
        // Set default image if blob is empty
        this.profileImageUrl = 'logo.png';
      }
    },
    error: (err) => {
      console.error('Image load error:', err);
      this.profileImageUrl = 'logo.png';
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
    // Save changes
    const locationParts = this.editLocation.split(',');
    const updateData = {
      bio: this.editBio,
      phone: this.editPhone, 
      location: {
        city: locationParts[0]?.trim() || '',
        province: locationParts[1]?.trim() || ''
      }
    };

    this.service.updateProfile(updateData).subscribe({
      next: (res) => {
        this.name = this.editName;
        this.email = this.editEmail;
        this.phone = this.editPhone; 
        this.bio = this.editBio;
        this.Location = this.editLocation;
      },
      error: (err) => {
        console.error('Update failed', err);
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

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Preview the image
    const reader = new FileReader();
    reader.onload = (e) => this.profileImageUrl = e.target?.result as string;
    reader.readAsDataURL(file);

    // Upload to backend
    this.uploadImage(file);
  }
}
uploadImage(file: File) {
  this.uploading = true;
  
  this.service.uploadProfile(file).subscribe({
    next: (response: HttpResponse<any>) => {
      if (response.status === 200 && response.body?.filePath) {
        // Refresh the image
        this.service.getProfileImage(response.body.filePath).subscribe(blob => {
          this.profileImageUrl = URL.createObjectURL(blob);
        });
      }
      this.uploading = false;
    },
    error: (error) => {
      console.error('Upload failed:', error);
      this.uploading = false;
      this.showError(error.message || 'Failed to upload image');
    }
  });
}

  showError(arg0: any) {
    
  }
  
  capitalizeWords(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

  // Array to store uploaded files
  /*uploadedFiles: File[] = [];

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
  }*/
}
