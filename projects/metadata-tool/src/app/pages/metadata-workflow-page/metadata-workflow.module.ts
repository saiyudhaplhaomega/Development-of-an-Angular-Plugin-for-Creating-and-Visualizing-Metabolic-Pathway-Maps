import { NgModule } from '@angular/core';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { MetadataWorkflowComponent } from './metadata-workflow.component';
import { registerCellType, NumericCellType, } from 'handsontable/cellTypes';
import { registerPlugin,UndoRedo,Filters, DropdownMenu } from 'handsontable/plugins';
import { MetadataWorkflowRoutingModule } from './metadata-workflow-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


// register the filtering plugins
registerPlugin(Filters);
registerPlugin(DropdownMenu);
registerCellType(NumericCellType);
registerPlugin(UndoRedo);


// register Handsontable's modules
registerAllModules();

@NgModule({
  declarations: [MetadataWorkflowComponent],
  imports: [
    CommonModule,
    HotTableModule,
    MetadataWorkflowRoutingModule,
    MatButtonModule
  ],
  exports: [MetadataWorkflowComponent],
})
export class WorkflowModule { }
