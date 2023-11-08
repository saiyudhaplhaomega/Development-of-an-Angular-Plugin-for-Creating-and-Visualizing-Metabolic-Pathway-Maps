import { NgModule } from '@angular/core';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { MetadataWorkflowComponent } from './metadata-workflow.component';
import { registerCellType, NumericCellType, } from 'handsontable/cellTypes';
import { registerPlugin,UndoRedo,Filters, DropdownMenu } from 'handsontable/plugins';
import { MetadataWorkflowRoutingModule } from './metadata-workflow-routing.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { CommonModule } from '@angular/common';
import { MetaDataCheckboxSelectionModule } from '../metadata-checkboxselection/metadata-checkboxselection.module';


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
    MatButtonModule,
    MetaDataCheckboxSelectionModule

  ],
  exports: [MetadataWorkflowComponent],
})
export class WorkflowModule { }
