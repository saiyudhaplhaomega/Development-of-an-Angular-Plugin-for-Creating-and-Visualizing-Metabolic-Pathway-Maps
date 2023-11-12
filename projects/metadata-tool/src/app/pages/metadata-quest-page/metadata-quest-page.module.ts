import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MetadataQuestFormComponent } from '../../components/metadata-quest-form/metadata-quest.component';
import { MetadataUploadpageComponent } from '../../components/upload-container/metadata-uploadpage.component';

@NgModule({
  declarations: [
    MetadataQuestFormComponent,
    MetadataUploadpageComponent,
  ],
  imports: [
    BrowserModule,
    // ... any other imports
  ],
  providers: [],

})
export class AppModule {}
