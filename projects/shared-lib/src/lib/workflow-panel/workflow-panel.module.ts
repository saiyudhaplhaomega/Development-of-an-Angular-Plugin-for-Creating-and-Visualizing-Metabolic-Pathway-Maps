import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowPanelComponent } from './workflow-panel.component';
import { WorkflowPanelDirective } from './workflow-panel-directive';
import { MatIconModule } from '@angular/material/icon';
import { IconDividerComponent } from './icon-divider.component';

@NgModule({
  declarations: [
    WorkflowPanelComponent,
    WorkflowPanelDirective,
    IconDividerComponent,
  ],
  imports: [CommonModule, MatIconModule],
  exports: [WorkflowPanelComponent, WorkflowPanelDirective],
})
export class WorkflowPanelModule {}
