import { TestBed } from '@angular/core/testing';

import { ErrorStatusProviderService } from './error-status-provider.service';

describe('ErrorStatusProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorStatusProviderService = TestBed.get(ErrorStatusProviderService);
    expect(service).toBeTruthy();
  });
});
