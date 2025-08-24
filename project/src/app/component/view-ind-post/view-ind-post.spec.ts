import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndPost } from './view-ind-post';

describe('ViewIndPost', () => {
  let component: ViewIndPost;
  let fixture: ComponentFixture<ViewIndPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewIndPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIndPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
