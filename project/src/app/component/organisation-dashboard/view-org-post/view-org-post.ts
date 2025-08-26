import { Component } from '@angular/core';
import { SponsorRequest } from '../../../model/sponsor-req';
import { SponsorRequestService } from '../../../service/sponsor-request-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../ui/footer/footer";

@Component({
  selector: 'app-view-org-post',
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './view-org-post.html',
  styleUrl: './view-org-post.css'
})
export class ViewOrgPost {
  requestId: string = '';
  request: SponsorRequest | null = null;
  userName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private sponsorService: SponsorRequestService
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.loadPostDetails();
  }

  loadPostDetails(): void {
    console.log("in here")
    this.sponsorService.getById(this.requestId).subscribe({
      next: (data) => {
        this.request = data;
      },
      error: (err) => {
        console.error('Error loading post:', err);
      }
    });
  }
}
