import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineSelectionComponent } from './pipeline-selection.component';

describe('PipelineSelectionComponent', () => {
  let component: PipelineSelectionComponent;
  let fixture: ComponentFixture<PipelineSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipelineSelectionComponent]
    });
    fixture = TestBed.createComponent(PipelineSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
