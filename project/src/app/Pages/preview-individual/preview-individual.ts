import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IndividualService } from '../../service/individual-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-individual',
  imports: [CommonModule],
  templateUrl: './preview-individual.html',
  styleUrl: './preview-individual.css'
})
export class PreviewIndividual {
isSubmitting: any;
onEdit() {
throw new Error('Method not implemented.');
}
onFileSelect($event: Event) {
throw new Error('Method not implemented.');
}
onDragOver($event: DragEvent) {
throw new Error('Method not implemented.');
}
onFileDrop($event: DragEvent) {
throw new Error('Method not implemented.');
}
onDragLeave($event: DragEvent) {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}
isEditing: any;
backButton() {
throw new Error('Method not implemented.');
}
   @Input() formData: any;
  @Input() selectedFiles: File[] = [];
  @Input() filePreviews: string[] = [];
  @Output() updateClicked = new EventEmitter<void>();
individualForm: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private individualService: IndividualService
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.individualService.getById(id).subscribe((data) => {
      this.formData = data;
      this.filePreviews = data.mediaUrls || [];
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

  

  onUpdate() {
    this.updateClicked.emit(); // notify parent component
  }
}
