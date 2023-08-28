import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataDownloadpageComponent } from './metadata-downloadpage.component';
import { MetadataDownloadpageRoutingModule } from './metadata-downloadpage-routing.module';



@NgModule({
  declarations: [MetadataDownloadpageComponent],
  imports: [
    CommonModule,
    MetadataDownloadpageRoutingModule,
  ],
  exports: [MetadataDownloadpageComponent]
})
export class MetadataDownloadpageModule { }
