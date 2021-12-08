import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAnnotationComponent } from './job-annotation.component';

describe('JobAnnotationComponent', () => {
  let component: JobAnnotationComponent;
  let fixture: ComponentFixture<JobAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
