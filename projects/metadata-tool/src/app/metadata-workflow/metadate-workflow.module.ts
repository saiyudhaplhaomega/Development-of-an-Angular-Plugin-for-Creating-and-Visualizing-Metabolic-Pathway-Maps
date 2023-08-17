import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { MetadataWorkflowComponent } from './metadata-workflow.component';
import { registerCellType, NumericCellType, } from 'handsontable/cellTypes';
import { registerPlugin,UndoRedo,Filters, DropdownMenu } from 'handsontable/plugins';


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
    BrowserModule,
    HotTableModule,
  ],
  exports: [MetadataWorkflowComponent],
})
export class WorkflowModule { }
