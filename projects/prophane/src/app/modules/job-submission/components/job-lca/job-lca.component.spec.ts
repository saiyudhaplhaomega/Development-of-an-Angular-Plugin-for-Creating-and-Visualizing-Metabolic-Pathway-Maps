import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLcaComponent } from './job-lca.component';

describe('JobLcaComponent', () => {
  let component: JobLcaComponent;
  let fixture: ComponentFixture<JobLcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobLcaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobLcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
