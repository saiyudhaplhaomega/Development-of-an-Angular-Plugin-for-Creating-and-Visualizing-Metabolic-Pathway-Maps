import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBoxComponent } from './info-box.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    InfoBoxComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class InfoBoxModule {



}
