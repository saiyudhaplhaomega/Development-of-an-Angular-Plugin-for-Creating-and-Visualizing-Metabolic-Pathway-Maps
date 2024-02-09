import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateScriptComponent } from './template-script-page.component';


const routes: Routes = [
  {path: '', component: TemplateScriptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateScriptRoutingModule { }
