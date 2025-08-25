import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IndividualRequest, IndividualService } from '../../service/individual-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-ind-post',
  imports: [CommonModule, RouterLink],
  templateUrl: './view-ind-post.html',
  styleUrl: './view-ind-post.css'
})
export class ViewIndPost {
  individual: IndividualRequest | null = null;
  id: string = '';

  constructor(private route: ActivatedRoute, private individualService: IndividualService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.loadIndividual(this.id);
    }
  }

  loadIndividual(id: string): void {
    this.individualService.getById(id).subscribe({
      next: (data) => {
        this.individual = data;
        console.log('Individual post:', data);
      },
      error: (err) => {
        console.error('Error loading individual post:', err);
      }
    });
  }
}
