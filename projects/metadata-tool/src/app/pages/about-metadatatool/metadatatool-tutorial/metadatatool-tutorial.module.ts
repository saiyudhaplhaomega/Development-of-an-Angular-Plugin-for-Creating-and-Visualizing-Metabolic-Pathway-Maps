import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatExpansionModule } from '@angular/material/expansion';
import { MetadatatoolTutorial } from './metadatatool-tutorial.component';
import { MetadatatoolTutorialRoutingModule } from './metadatatool-tutorial-routing.component';

@NgModule({
  declarations: [MetadatatoolTutorial],
  imports: [CommonModule, MetadatatoolTutorialRoutingModule, MatExpansionModule],
})
export class MetadatatoolTutorialModule {}