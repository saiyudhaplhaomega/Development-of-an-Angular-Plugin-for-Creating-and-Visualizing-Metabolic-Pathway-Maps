import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  TemplateRoutingModule } from './template-routing.component';
import { TemplateComponent } from './template.component';
import { OverviewCardModule } from "../../layout/overview-card/overview-card.module";

@NgModule({
    declarations: [TemplateComponent],
    exports: [TemplateComponent],
    imports: [
        CommonModule,
        TemplateRoutingModule,
        MatButtonModule,
        MatIconModule,
        OverviewCardModule,
    ]
})
export class TemplateModule { }
