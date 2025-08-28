import { TestBed } from '@angular/core/testing';

import { SidebarserviceService } from './sidebarservice.service';

describe('SidebarserviceService', () => {
  let service: SidebarserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
