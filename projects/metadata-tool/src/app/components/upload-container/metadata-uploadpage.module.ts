import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataUploadContainerComponent } from './metadata-uploadpage.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MetadataUploadpageRoutingModule } from './metadata-uploadpage-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [MetadataUploadContainerComponent],
  imports: [
    CommonModule,

    // material
    MatIconModule,
    MatProgressBarModule,
    MetadataUploadpageRoutingModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [MetadataUploadContainerComponent],
})
export class MetadataUploadContainerModule {}
