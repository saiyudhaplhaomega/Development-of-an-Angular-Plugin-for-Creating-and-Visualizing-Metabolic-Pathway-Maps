import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowPanelComponent } from './workflow-panel/workflow-panel.component';
import { WorkflowPanelDirective } from './workflow-panel/workflow-panel-directive';
import { MatIconModule } from '@angular/material/icon';
import { IconDividerComponent } from './icon-divider/icon-divider.component';
import { NoDataPlaceholderComponent } from './no-data-placeholder/no-data-placeholder.component';

@NgModule({
  declarations: [
    WorkflowPanelComponent,
    WorkflowPanelDirective,
    IconDividerComponent,
    NoDataPlaceholderComponent,
  ],
  imports: [CommonModule, MatIconModule],
  exports: [WorkflowPanelComponent, WorkflowPanelDirective],
})
export class WorkflowPanelModule {}
