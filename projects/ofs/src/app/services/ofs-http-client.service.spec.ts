import { TestBed } from '@angular/core/testing';

import { OfsHttpClientService } from './ofs-http-client.service';

describe('OfsHttpClientServiceService', () => {
  let service: OfsHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfsHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
