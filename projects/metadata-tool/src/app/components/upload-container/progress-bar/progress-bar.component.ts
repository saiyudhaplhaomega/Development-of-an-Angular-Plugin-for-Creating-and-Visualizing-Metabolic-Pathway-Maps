import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['../metadata-uploadpage.component.scss'],
})
export class ProgressBarComponent {
  @Input() uploadProgress: number;

  uploadStartTime: number;
  timeRemaining: string = '';

  @ViewChild(MatProgressBar, { static: true }) progressBar: MatProgressBar;
  @ViewChild(MatTooltip) tooltip: MatTooltip;

  showTooltip() {
    if (this.tooltip) {
      this.tooltip.show();
    }
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.hide();
    }
  }

  private calculateTimeRemaining(): void {
    if (this.uploadProgress > 0) {
      const timeElapsed = Date.now() - this.uploadStartTime;
      const totalEstimatedTime = timeElapsed / (this.uploadProgress / 100);
      const remainingTime = totalEstimatedTime - timeElapsed;
      this.timeRemaining = this.formatTime(remainingTime);
    }
  }

  private formatTime(milliseconds: number): string {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes} min ${seconds} sec`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.uploadProgress &&
      changes.uploadProgress.currentValue > 0 &&
      !this.uploadStartTime
    ) {
      this.uploadStartTime = Date.now(); // Initialize the start time when uploadProgress starts
    }
    this.calculateTimeRemaining();
  }
}
