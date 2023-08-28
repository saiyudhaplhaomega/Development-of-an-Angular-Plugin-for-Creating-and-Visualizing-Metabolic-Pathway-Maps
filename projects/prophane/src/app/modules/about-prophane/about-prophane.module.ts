import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutProphaneRoutingModule } from './about-prophane-routing.module';
import { ProphaneAboutComponent } from './prophane-about/prophane-about.component';


@NgModule({
  declarations: [
    ProphaneAboutComponent,
  ],
  imports: [
    CommonModule,
    AboutProphaneRoutingModule
  ]
})
export class AboutProphaneModule { }
