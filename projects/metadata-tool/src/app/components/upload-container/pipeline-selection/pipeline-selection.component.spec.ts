import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionComponent } from './pipeline-selection.component';

describe('PipelineSelectionComponent', () => {
  let component: SelectionComponent;
  let fixture: ComponentFixture<SelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionComponent]
    });
    fixture = TestBed.createComponent(SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
