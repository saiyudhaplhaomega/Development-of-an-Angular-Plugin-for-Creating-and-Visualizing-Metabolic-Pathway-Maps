import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowPanelComponent } from './workflow-panel.component';
import { IconDividerModule } from '../icon-divider/icon-divider.module';
import { WorkflowPanelDirective } from './workflow-panel-directive';

@NgModule({
  declarations: [WorkflowPanelComponent, WorkflowPanelDirective],
  imports: [CommonModule, IconDividerModule],
  exports: [WorkflowPanelComponent, WorkflowPanelDirective],
})
export class WorkflowPanelModule {}
