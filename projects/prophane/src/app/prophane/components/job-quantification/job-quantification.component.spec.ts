import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobQuantificationComponent } from './job-quantification.component';

describe('JobQuantificationComponent', () => {
  let component: JobQuantificationComponent;
  let fixture: ComponentFixture<JobQuantificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobQuantificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobQuantificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
