import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";

import { CommonModule } from '@angular/common';
import { ToolsComponent } from './tools.component';
import { ToolsRoutingModule } from './tools-routing.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ToolsComponent],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    MatButtonModule,
    MatIconModule,

  ],

  exports: [ToolsComponent],
})
export class ToolsModule {}
