import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataQuestPageComponent } from './metadata-quest-page.component';

const routes: Routes = [{ path: '', component: MetadataQuestPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataQuestPageRoutingModule { }
