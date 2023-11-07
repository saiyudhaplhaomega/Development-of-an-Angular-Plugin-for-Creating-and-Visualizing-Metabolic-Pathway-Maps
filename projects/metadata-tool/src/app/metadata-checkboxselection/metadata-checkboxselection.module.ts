import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MetaDataCheckboxSelectionComponent } from './metadata-checkboxselection.component';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [MetaDataCheckboxSelectionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
  
  ],
  exports: [MetaDataCheckboxSelectionComponent]
})
export class MetaDataCheckboxSelectionModule { }
