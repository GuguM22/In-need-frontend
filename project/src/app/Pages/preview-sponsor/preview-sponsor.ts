import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorRequestService } from '../../service/sponsor-request-service';

@Component({
  selector: 'app-preview-sponsor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-sponsor.html',
  styleUrls: ['./preview-sponsor.css']
})
export class PreviewSponsor implements OnInit {

   @Input() formData: any;
   @Input() fileNames: string[] = [];
  @Input() filePreviews: string[] = [];
  @Output() updateClicked = new EventEmitter<void>();

  constructor(private http: HttpClient, private route: ActivatedRoute, private sponsorRequest: SponsorRequestService,  private router: Router,) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id')!;

  // Only fetch from API if formData was not passed in
  if (!this.formData && id) {
    this.sponsorRequest.getById(id)
      .subscribe(data => {
        this.formData = data;

        // If the backend provides files, map them to names
        this.filePreviews = data?.mediaUrls?.map((f: any) => f.name) || [];
      });
  }
}

  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getPriorityColor(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  }

  //  onUpdate() {
  // this.router.navigate(['/sponsor-request'], {
  //   state: { formData: this.formData, files: this.filePreviews }
  // });
  onUpdate() {
  this.router.navigate(['/sponsor-request'], {
    state: { formData: this.formData, files: this.filePreviews, id: this.formData?.id }
  });
}


onSubmitUpdate() {
  if (!this.formData?.id) {
    alert('No request ID found.');
    return;
  }

  const formData = new FormData();
  formData.append('title', this.formData.title);
  formData.append('priority', this.formData.priority || '');
  formData.append('quantity', String(this.formData.quantity));
  formData.append('requiredDate', this.formData.requiredDate);
  formData.append('description', this.formData.description);

  // If you have files stored separately
  if (this.filePreviews?.length) {
    this.filePreviews.forEach((file: any) => {
      if (file instanceof File) {
        formData.append('mediaFiles', file, file.name);
      }
    });
  }

  this.sponsorRequest.update(this.formData.id, formData).subscribe({
    next: (updated: any) => {
      alert('Request updated successfully.');
     
       this.router.navigate(['/uploaded'], {
        state: { formData: updated, files: this.filePreviews }
      });
    },
    error: (err: any) => {
      console.error(err);
      alert('Failed to update request.');
    }
  });
}


}