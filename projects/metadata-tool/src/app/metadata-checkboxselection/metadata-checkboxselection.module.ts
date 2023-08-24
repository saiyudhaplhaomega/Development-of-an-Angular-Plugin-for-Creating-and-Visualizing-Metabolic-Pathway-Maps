import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MetaDataCheckboxSelectionComponent } from './metadata-checkboxselection.component';


@NgModule({
  declarations: [MetaDataCheckboxSelectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [MetaDataCheckboxSelectionComponent]
})
export class MetaDataCheckboxSelectionModule { }
