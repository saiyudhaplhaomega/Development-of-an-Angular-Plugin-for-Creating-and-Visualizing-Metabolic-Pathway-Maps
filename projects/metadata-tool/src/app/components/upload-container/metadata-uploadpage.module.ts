import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataUploadContainerComponent } from './metadata-uploadpage.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MetadataUploadpageRoutingModule } from './metadata-uploadpage-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule

  ],
  exports: [MetadataUploadContainerComponent],
})
export class MetadataUploadContainerModule {}
