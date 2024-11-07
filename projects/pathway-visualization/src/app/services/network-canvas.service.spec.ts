import { TestBed } from '@angular/core/testing';

import { NetworkCanvasService } from './network-canvas.service';

describe('NetworkCanvasService', () => {
  let service: NetworkCanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkCanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
