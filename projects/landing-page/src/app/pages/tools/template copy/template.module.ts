import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MetaForgeRoutingModule } from './template-routing.component';
import { MetaForgeComponent } from './template.component';
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
