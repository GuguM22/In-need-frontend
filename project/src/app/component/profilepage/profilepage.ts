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
import { Loader } from '../../ui/loader/loader';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FooterComponent,
    NavbarComponent,
    Loader
],
  providers: [Services],
  templateUrl: './profilepage.html',
})
export class ProfilepageComponent implements OnInit {
  isEditing = false;
  profileImageUrl: string | ArrayBuffer | null = null;
  uploading = false;
  isSponsor = false;
  statusText: string = '';//
  isLoading = true;


  role = Role.SPONSORS || Role.INDIVIDUAL || Role.ORGANIZATION;


  constructor(private location: Location, private service: Services) {
    setTimeout(() =>{
      this.isLoading = false}, 1000
    )
  }

ngOnInit() {
  this.service.profile().subscribe({
    next: (data: any) => {
      this.name = data.name || '';
      this.email = data.email || '';
      this.bio = data.bio || '';

      const role = data.role;

    if (role === Role.ORGANIZATION) {
      if (!data.phoneStatus) {
        this.phone = 'No Number';
        this.statusText = 'Not verified';
      } else {
        switch (data.phoneStatus) {
          case 'APPROVED':
            this.phone = data.phone || 'Phone not available';
            this.statusText = 'Accepted';
            break;
          case 'PENDING':
            this.phone = 'Pending verification';
            this.statusText = 'Pending';
            break;
          case 'REJECTED':
            this.phone = 'Not verified yet';
            this.statusText = 'Rejected';
            break;
          default:
            this.phone = 'Not verified yet';
            this.statusText = 'Not verified';
        }
      }
    } else {
       this.phone = data.phone || 'Not applicable';
    }

      // Location handling
      if (data.location) {
        if (typeof data.location === 'string') {
          this.Location = data.location;
        } else if (data.location.city || data.location.province) {
          this.Location = [data.location.city, data.location.province]
            .filter(Boolean)
            .join(', ');
        } else {
          this.Location = 'Location not specified';
        }
      } else {
        this.Location = 'Location not specified';
      }

      this.editLocation = this.Location;

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
      error: (err) => console.error('Update failed', err)
    });
  } else {
    this.editName = this.name;
    this.editEmail = this.email;
    this.editPhone = this.phone;
    this.editBio = this.bio;
    this.editLocation = this.Location;
  }

  // Toggle editing state
  this.isEditing = !this.isEditing;
}

saveProfile() {
  const updateData: any = {
    bio: this.bio,
    location: {
      city: this.editLocation,
      province: this.editLocation
    },
    phone: this.phone 
  };

  this.service.updateProfile(updateData).subscribe({
    next: (res) => {

      // Update local UI immediately
      if (this.role === Role.ORGANIZATION) {
        this.statusText = 'Pending';
      } else {
        this.statusText = 'Accepted';
      }

      this.phone = this.phone;
    },
    error: (err) => {
      console.error('Update failed', err);
    }
  });
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
