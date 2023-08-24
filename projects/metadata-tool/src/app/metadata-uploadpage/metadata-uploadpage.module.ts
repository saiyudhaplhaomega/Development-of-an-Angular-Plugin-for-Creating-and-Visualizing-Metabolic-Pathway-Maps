import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataUploadpageComponent } from './metadata-uploadpage.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [MetadataUploadpageComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [MetadataUploadpageComponent]
})
export class MetadataUploadpageModule { }
