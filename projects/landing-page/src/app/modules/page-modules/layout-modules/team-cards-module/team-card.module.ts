import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TeamCardComponent } from './team-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [TeamCardComponent],
    exports: [TeamCardComponent],
    imports: [CommonModule, MatButtonModule, RouterModule, MatTableModule]
})
export class TeamCardModule {}
