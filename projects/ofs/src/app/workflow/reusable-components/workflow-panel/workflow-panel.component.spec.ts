import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowPanelComponent } from './workflow-panel.component';

describe('WorkflowPanelComponent', () => {
  let component: WorkflowPanelComponent;
  let fixture: ComponentFixture<WorkflowPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
