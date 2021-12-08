import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSubmitComponent } from './job-submit.component';

describe('JobSubmitComponent', () => {
  let component: JobSubmitComponent;
  let fixture: ComponentFixture<JobSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
