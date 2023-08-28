import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCustomMapComponent } from './job-custom-map.component';

describe('JobCustomMapComponent', () => {
  let component: JobCustomMapComponent;
  let fixture: ComponentFixture<JobCustomMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCustomMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCustomMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
