import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MetaDataCheckboxSelectionComponent } from './metadata-checkboxselection.component';

import { MatButtonModule } from '@angular/material/button';
import { MetadataCheckboxSelectionRoutingModule } from './metadata-checkboxselection-routing.module';


@NgModule({
  declarations: [MetaDataCheckboxSelectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MetadataCheckboxSelectionRoutingModule,
    MatButtonModule,
  ],
  exports: [MetaDataCheckboxSelectionComponent]
})
export class MetaDataCheckboxSelectionModule { }
