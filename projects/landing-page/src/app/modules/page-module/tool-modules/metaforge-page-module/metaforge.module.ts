import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MetaForgeRoutingModule } from './metaforge-routing.component';
import { MetaForgeComponent } from './metaforge.component';
import { OverviewCardModule } from "../../layout/overview-card/overview-card.module";

@NgModule({
    declarations: [MetaForgeComponent],
    exports: [MetaForgeComponent],
    imports: [
        CommonModule,
        MetaForgeRoutingModule,
        MatButtonModule,
        MatIconModule,
        OverviewCardModule,
    ]
})
export class MetaForgeModule { }
