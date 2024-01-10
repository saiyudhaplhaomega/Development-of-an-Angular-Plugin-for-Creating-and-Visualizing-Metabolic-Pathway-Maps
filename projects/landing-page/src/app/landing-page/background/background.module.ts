import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";

import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background.component';
import { BackgroundRoutingModule } from './background-routing.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [BackgroundComponent],
  imports: [
    CommonModule,
    BackgroundRoutingModule,
    MatButtonModule,
    MatIconModule,

  ],

  exports: [BackgroundComponent],
})
export class BackgroundModule {}
