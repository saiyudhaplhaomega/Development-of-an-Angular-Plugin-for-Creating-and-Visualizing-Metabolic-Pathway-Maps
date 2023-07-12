import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentComparisonComponent } from './experiment-comparison.component';

describe('ExperimentComparisonComponent', () => {
  let component: ExperimentComparisonComponent;
  let fixture: ComponentFixture<ExperimentComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperimentComparisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperimentComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
