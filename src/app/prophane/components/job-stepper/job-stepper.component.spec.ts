import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStepperComponent } from './job-stepper.component';

describe('JobStepperComponent', () => {
  let component: JobStepperComponent;
  let fixture: ComponentFixture<JobStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
