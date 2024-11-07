import { TestBed } from '@angular/core/testing';

import { NetworkManagerService } from './network-manager.service';

describe('NetworkManagerService', () => {
  let service: NetworkManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
