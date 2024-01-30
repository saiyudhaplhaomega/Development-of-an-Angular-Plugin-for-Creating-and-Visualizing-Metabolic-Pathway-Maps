import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { LandingPageComponent } from './landing-page.component';
import { ToolCardModule } from './submodules/tool-card-module/tool-card.module';
import { UpdateListModule } from './submodules/update-list-module/update-list.module';
import { CommonModule } from '@angular/common';
import { BackgroundModule } from './submodules/background-module/background.module';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule

  ],

  exports: [LandingPageComponent],
})
export class LandingPageModule {}
