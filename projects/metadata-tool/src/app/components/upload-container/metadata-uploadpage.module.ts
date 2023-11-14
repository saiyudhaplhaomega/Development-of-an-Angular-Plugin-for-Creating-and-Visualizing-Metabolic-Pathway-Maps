import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataUploadContainerComponent } from './metadata-uploadpage.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MetadataUploadpageRoutingModule } from './metadata-uploadpage-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MetadataUploadContainerComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    MetadataUploadpageRoutingModule,
    MatButtonModule,
  ],
  exports: [MetadataUploadContainerComponent]
})
export class MetadataUploadContainerModule { }
