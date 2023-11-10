import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataQuestComponent } from './metadata-quest.component';

const routes: Routes = [{ path: '', component: MetadataQuestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetadataQuestRoutingModule {}
