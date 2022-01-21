import { TestBed } from '@angular/core/testing';

import { TokenRequestService } from './token-request.service';

describe('TokenRequestService', () => {
  let service: TokenRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
