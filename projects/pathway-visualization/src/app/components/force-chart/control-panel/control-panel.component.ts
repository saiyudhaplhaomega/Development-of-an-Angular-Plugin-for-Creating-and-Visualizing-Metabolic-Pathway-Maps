import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  template: `
    <div class="control-panel">
      <button (click)="zoomIn()"><i class="fas fa-search-plus"></i></button>
      <button (click)="zoomOut()"><i class="fas fa-search-minus"></i></button>
      <button (click)="panGraph()"><i class="fas fa-arrows-alt"></i></button>
      <button (click)="selectNode()"><i class="fas fa-mouse-pointer"></i></button>
      <button (click)="refreshGraph()"><i class="fas fa-sync"></i></button>
      <button (click)="toggleCallbackMode()"><i class="fas fa-code"></i></button>
      <button (click)="toggleTextBoxMode()"><i class="fas fa-edit"></i></button>
      <button (click)="uploadFile()"><i class="fas fa-file-upload"></i></button>
    </div>
  `,
  styleUrls: ['force-chart.component.css']
})
export class ControlPanelComponent {
  @Output() zoomInEvent = new EventEmitter<void>();
  @Output() zoomOutEvent = new EventEmitter<void>();
  @Output() panGraphEvent = new EventEmitter<void>();
  @Output() selectNodeEvent = new EventEmitter<void>();
  @Output() refreshGraphEvent = new EventEmitter<void>();
  @Output() toggleCallbackModeEvent = new EventEmitter<void>();
  @Output() toggleTextBoxModeEvent = new EventEmitter<void>();
  @Output() uploadFileEvent = new EventEmitter<void>();

  zoomIn() {
    this.zoomInEvent.emit();
  }

  zoomOut() {
    this.zoomOutEvent.emit();
  }

  panGraph() {
    this.panGraphEvent.emit();
  }

  selectNode() {
    this.selectNodeEvent.emit();
  }

  refreshGraph() {
    this.refreshGraphEvent.emit();
  }

  toggleCallbackMode() {
    this.toggleCallbackModeEvent.emit();
  }

  toggleTextBoxMode() {
    this.toggleTextBoxModeEvent.emit();
  }

  uploadFile() {
    this.uploadFileEvent.emit();
  }
}
