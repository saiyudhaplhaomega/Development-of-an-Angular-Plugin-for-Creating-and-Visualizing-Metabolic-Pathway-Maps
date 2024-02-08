import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TemplateScriptRoutingModule } from './template-script-page-routing.component';
import { TemplateScriptComponent } from './template-script-page.component';

@NgModule({
  declarations: [TemplateScriptComponent],
  imports: [
    CommonModule,
    TemplateScriptRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [TemplateScriptComponent],
})
export class TemplateScriptModule { }
