import { NgModule } from '@angular/core';
import { ToolCardComponent } from './tool-card.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ToolCardComponent],
  imports: [

    MatButtonModule

  ],
  exports: [ToolCardComponent],
})
export class ToolCardModule { }