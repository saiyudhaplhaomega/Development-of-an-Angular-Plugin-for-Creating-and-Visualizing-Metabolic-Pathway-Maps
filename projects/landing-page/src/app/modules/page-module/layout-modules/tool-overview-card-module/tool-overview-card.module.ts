import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToolOverviewCardComponent } from './tool-overview-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [ToolOverviewCardComponent],
    exports: [ToolOverviewCardComponent],
    imports: [CommonModule, MatButtonModule, RouterModule, MatTableModule]
})
export class ToolOverviewCardModule {}
