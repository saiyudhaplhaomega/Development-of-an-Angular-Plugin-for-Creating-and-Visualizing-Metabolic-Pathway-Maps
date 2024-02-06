import { TestBed } from '@angular/core/testing';

import { CustomStepperService } from './custom-stepper.service';

describe('StepperService', () => {
  let service: CustomStepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomStepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
