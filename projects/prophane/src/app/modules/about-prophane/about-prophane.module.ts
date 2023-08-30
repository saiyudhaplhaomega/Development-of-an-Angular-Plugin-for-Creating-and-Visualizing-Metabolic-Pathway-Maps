import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutProphaneRoutingModule } from './about-prophane-routing.module';
import { ProphaneAboutComponent } from './prophane-about/prophane-about.component';
import { MaterialModule } from 'projects/mpa/src/app/material-module';


@NgModule({
  declarations: [
    ProphaneAboutComponent,
  ],
  imports: [
    CommonModule,
    AboutProphaneRoutingModule,

    MaterialModule,
  ]
})
export class AboutProphaneModule { }
