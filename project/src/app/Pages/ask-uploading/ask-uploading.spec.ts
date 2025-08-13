import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskUploading } from './ask-uploading';

describe('AskUploading', () => {
  let component: AskUploading;
  let fixture: ComponentFixture<AskUploading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskUploading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskUploading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
