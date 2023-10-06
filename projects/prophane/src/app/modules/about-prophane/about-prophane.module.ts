import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutProphaneRoutingModule } from './about-prophane-routing.module';
import { ProphaneAboutComponent } from './prophane-about/prophane-about.component';
import { ProphaneTutorialComponent } from './prophane-tutorial/prophane-tutorial.component';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    ProphaneAboutComponent,
    ProphaneTutorialComponent,
  ],
  imports: [
    CommonModule,
    AboutProphaneRoutingModule,
    MatExpansionModule,
  ]
})
export class AboutProphaneModule { }
