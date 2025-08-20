import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  @Input() selectedFiles: File[] = [];
  @Input() filePreviews: string[] = [];
  @Output() updateClicked = new EventEmitter<void>();

  constructor(private http: HttpClient, private route: ActivatedRoute, private sponsorRequest: SponsorRequestService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id) // get ID from URL
    if (id) {
      this.sponsorRequest.getById(id)
        .subscribe(data => {
          this.formData = data; // bind to preview
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

  onUpdate() {
    this.updateClicked.emit(); // notify parent component
  }
}
