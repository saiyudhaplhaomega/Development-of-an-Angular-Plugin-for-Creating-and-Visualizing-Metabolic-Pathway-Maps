import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MetaForgeRoutingModule } from './metaforge-routing.component';
import { MetaForgeComponent } from './metaforge.component';
import { ToolOverviewCardModule } from '../../layout-modules/tool-overview-card-module/tool-overview-card.module';

@NgModule({
    declarations: [MetaForgeComponent],
    exports: [MetaForgeComponent],
    imports: [
        CommonModule,
        MetaForgeRoutingModule,
        MatButtonModule,
        MatIconModule,
        ToolOverviewCardModule,
    ]
})
export class MetaForgeModule { }
