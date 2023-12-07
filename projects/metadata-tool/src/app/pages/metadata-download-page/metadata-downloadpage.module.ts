import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataDownloadpageComponent } from './metadata-downloadpage.component';
import { MetadataDownloadpageRoutingModule } from './metadata-downloadpage-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [MetadataDownloadpageComponent],
  imports: [
    CommonModule,
    MetadataDownloadpageRoutingModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: [MetadataDownloadpageComponent]
})
export class MetadataDownloadpageModule { }
