import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MetadataQuestFormComponent } from "./metadata-quest.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: MetadataQuestFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class MetadataQuestRoutingModule {}
