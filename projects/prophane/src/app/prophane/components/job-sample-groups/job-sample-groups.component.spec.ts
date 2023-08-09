import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSampleGroupsComponent } from './job-sample-groups.component';

describe('JobSampleGroupsComponent', () => {
  let component: JobSampleGroupsComponent;
  let fixture: ComponentFixture<JobSampleGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSampleGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSampleGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
