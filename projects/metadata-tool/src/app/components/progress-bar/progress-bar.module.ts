import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [ProgressBarComponent],
  imports: [
    CommonModule,
    MatProgressBarModule, // Import MatProgressBarModule here
  ],
  exports: [ProgressBarComponent],
})
export class ProgressBarModule {}
