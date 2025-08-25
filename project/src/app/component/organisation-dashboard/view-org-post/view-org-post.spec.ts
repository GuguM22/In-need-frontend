import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrgPost } from './view-org-post';

describe('ViewOrgPost', () => {
  let component: ViewOrgPost;
  let fixture: ComponentFixture<ViewOrgPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrgPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrgPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
