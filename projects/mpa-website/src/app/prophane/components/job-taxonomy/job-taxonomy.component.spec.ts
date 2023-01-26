import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTaxonomyComponent } from './job-taxonomy.component';

describe('JobTaxonomyComponent', () => {
  let component: JobTaxonomyComponent;
  let fixture: ComponentFixture<JobTaxonomyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTaxonomyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTaxonomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
