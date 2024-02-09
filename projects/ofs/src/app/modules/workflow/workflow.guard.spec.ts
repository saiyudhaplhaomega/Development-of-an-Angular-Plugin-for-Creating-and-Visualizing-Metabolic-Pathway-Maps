import { TestBed } from '@angular/core/testing';

import { WorkflowGuard } from './workflow.guard';

describe('WorkflowGuard', () => {
  let guard: WorkflowGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WorkflowGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
