import { TestBed } from '@angular/core/testing';

import { UserInfoDtoService } from './user-info-dto.service';

describe('UserInfoDtoService', () => {
  let service: UserInfoDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
