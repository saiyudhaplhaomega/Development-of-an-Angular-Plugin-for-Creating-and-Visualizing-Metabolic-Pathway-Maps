import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultFiguresComponent } from './result-figures.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [ResultFiguresComponent, SafePipe],
  imports: [CommonModule, MatTabsModule, MatProgressSpinnerModule],
  exports: [ResultFiguresComponent],
})
export class ResultFiguresModule {}
