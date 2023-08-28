import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataDownloadpageComponent } from './metadata-downloadpage.component';

const routes: Routes = [
  {path: '', component: MetadataDownloadpageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataDownloadpageRoutingModule { }
