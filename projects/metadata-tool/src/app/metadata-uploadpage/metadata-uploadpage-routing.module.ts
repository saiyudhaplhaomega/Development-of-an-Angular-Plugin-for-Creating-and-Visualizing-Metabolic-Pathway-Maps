import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataUploadpageComponent } from './metadata-uploadpage.component';

const routes: Routes = [
  {path: '', component: MetadataUploadpageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataUploadpageRoutingModule { }
