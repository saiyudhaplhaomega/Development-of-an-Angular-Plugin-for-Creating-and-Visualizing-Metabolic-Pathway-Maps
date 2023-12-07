import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutMetadatatoolRoutingModule } from './metadatatool-about-routing.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AboutMetadatatool } from './metadatatool-about.component';

@NgModule({
  declarations: [AboutMetadatatool],
  imports: [CommonModule, AboutMetadatatoolRoutingModule, MatExpansionModule],
})
export class AboutMetadatatoolModule {}