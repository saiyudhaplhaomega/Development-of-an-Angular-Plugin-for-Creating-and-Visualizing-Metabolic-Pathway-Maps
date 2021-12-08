import { TestBed } from '@angular/core/testing';

import { ProphaneJobStateService } from './prophane-job-state.service';

describe('ProphaneJobStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProphaneJobStateService = TestBed.get(ProphaneJobStateService);
    expect(service).toBeTruthy();
  });
});
