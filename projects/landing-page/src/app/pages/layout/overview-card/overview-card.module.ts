import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OverviewCardComponent } from './overview-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { UpdateListModule } from "../../../landing-page/update-list/update-list.module";

@NgModule({
    declarations: [OverviewCardComponent],
    exports: [OverviewCardComponent],
    imports: [CommonModule, MatButtonModule, RouterModule, MatTableModule, UpdateListModule]
})
export class OverviewCardModule {}
