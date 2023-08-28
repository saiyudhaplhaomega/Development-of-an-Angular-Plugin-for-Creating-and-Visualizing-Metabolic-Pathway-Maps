import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFunctionComponent } from './job-function.component';

describe('JobFunctionComponent', () => {
  let component: JobFunctionComponent;
  let fixture: ComponentFixture<JobFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
