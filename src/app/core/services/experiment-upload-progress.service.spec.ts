import { TestBed } from '@angular/core/testing';

import { ExperimentUploadProgressService } from './experiment-upload-progress.service';

describe('ExperimentUploadProgressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExperimentUploadProgressService = TestBed.get(ExperimentUploadProgressService);
    expect(service).toBeTruthy();
  });
});
