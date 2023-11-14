import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataUploadContainerComponent } from './metadata-uploadpage.component';

const routes: Routes = [
  {path: '', component: MetadataUploadContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataUploadpageRoutingModule { }
