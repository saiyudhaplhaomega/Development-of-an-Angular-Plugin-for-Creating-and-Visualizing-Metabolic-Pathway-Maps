import { TestBed } from '@angular/core/testing';

import { WorkflowPanelService } from './workflow-panel.service';

describe('WorkflowPanelService', () => {
  let service: WorkflowPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
