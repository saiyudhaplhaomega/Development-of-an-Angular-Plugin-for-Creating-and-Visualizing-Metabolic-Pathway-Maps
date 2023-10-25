import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MetaDataCheckboxSelectionComponent } from './metadata-checkboxselection.component';
import { MetadataWorkflowRoutingModule } from './metadata-checkboxselection-routing.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [MetaDataCheckboxSelectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MetadataWorkflowRoutingModule,
    MatButtonModule,
  ],
  exports: [MetaDataCheckboxSelectionComponent]
})
export class MetaDataCheckboxSelectionModule { }
