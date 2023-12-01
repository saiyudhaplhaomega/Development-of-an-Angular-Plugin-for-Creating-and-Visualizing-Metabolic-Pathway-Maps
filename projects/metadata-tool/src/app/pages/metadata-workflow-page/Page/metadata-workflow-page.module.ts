import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataWorkflowPageComponent } from './metadata-workflow-page.component';
import { MetadataWorkflowPageRoutingModule } from './metadata-workflow-page-routing.module';
import { MetaDataCheckboxSelectionModule } from '../../../components/metadata-checkboxselection/metadata-checkboxselection.module';
import { WorkflowModule } from '../metadata-workflow.module';
import { HotTableModule } from '@handsontable/angular';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MetadataWorkflowPageComponent, // Only components, directives, and pipes here
  ],
  imports: [
    CommonModule,
    MetadataWorkflowPageRoutingModule,
    MetaDataCheckboxSelectionModule,
    WorkflowModule,
    HotTableModule,
    MatButtonModule,

  ],
})
export class MetadataWorkflowPageModule {}
