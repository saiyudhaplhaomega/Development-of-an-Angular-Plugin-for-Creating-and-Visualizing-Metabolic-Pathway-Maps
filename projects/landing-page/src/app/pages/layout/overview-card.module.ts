import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OverviewCardComponent } from './overview-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [OverviewCardComponent],
  imports: [CommonModule, MatButtonModule,RouterModule, MatTableModule],
  exports: [OverviewCardComponent],
})
export class OverviewCardModule {}
