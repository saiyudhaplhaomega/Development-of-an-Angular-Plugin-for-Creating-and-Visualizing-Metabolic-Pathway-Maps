import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataQuestPageRoutingModule } from './metadata-quest-page-routing.module';
import { MetadataQuestPageComponent } from './metadata-quest-page.component';
import { MetadataQuestFormModule } from '../../components/metadata-quest-form/metadata-quest.module';
import { MetadataUploadContainerModule } from '../../components/upload-container/metadata-uploadpage.module';

@NgModule({
  declarations: [
    MetadataQuestPageComponent, // Only components, directives, and pipes here
  ],
  imports: [
    CommonModule,
    MetadataQuestPageRoutingModule,
    MetadataQuestFormModule, // Modules should be included here
    MetadataUploadContainerModule
  ],
})
export class MetadataQuestPageModule {}
