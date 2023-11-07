import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataUploadpageComponent } from './metadata-uploadpage.component';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import { MetadataUploadpageRoutingModule } from './metadata-uploadpage-routing.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [
    MetadataUploadpageComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    MetadataUploadpageRoutingModule,
    MatButtonModule,
  ],
  exports: [MetadataUploadpageComponent]
})
export class MetadataUploadpageModule { }
