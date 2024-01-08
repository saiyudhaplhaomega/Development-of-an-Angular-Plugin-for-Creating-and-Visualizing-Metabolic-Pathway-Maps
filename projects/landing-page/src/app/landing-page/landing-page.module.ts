import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { LandingPageComponent } from './landing-page.component';
import { ToolCardModule } from './tool-card/tool-card.module';
import { UpdateListModule } from './update-list/update-list.module';
import { CommonModule } from '@angular/common';
import { BackgroundModule } from './background/background.module';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BackgroundModule,
    ToolCardModule,
    UpdateListModule,

    MatCardModule,
    MatGridListModule,
    MatIconModule,

  ],

  exports: [LandingPageComponent],
})
export class LandingPageModule {}
