import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: `control-panel.component.html`,
  styleUrls: ['force-chart.component.css']
})
export class ControlPanelComponent {
  @Input() activeToolName: string;
  @Input() panEnabled: boolean;
  @Input() brushEnabled: boolean;
  @Input() textBoxMode: boolean;
  @Output() searchEvent = new EventEmitter<void>();
  @Output() zoomInEvent = new EventEmitter<void>();
  @Output() zoomOutEvent = new EventEmitter<void>();
  @Output() toolTipEvent = new EventEmitter<void>();
  @Output() panGraphEvent = new EventEmitter<void>();
  @Output() selectNodeEvent = new EventEmitter<void>();
  @Output() refreshGraphEvent = new EventEmitter<void>();
  @Output() toggleCallbackModeEvent = new EventEmitter<void>();
  @Output() snapModeEvent = new EventEmitter<void>();
  @Output() orthogonalEvent = new EventEmitter<void>();
  @Output() shortagePathEvent = new EventEmitter<void>();
  // @Output() enableFBSEvent = new EventEmitter<void>();
  @Output() arrowAnimationEvent = new EventEmitter<void>();
  @Output() dynamicEvent = new EventEmitter<void>();
  @Output() toggleTextBoxModeEvent = new EventEmitter<void>();
  @Output() uploadFileEvent = new EventEmitter<void>();

  search() {
    this.searchEvent.emit();
  }
  zoomIn() {
    this.zoomInEvent.emit();
  }
  showTooltip(){
    this.toolTipEvent.emit();
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

  toggleCallbackMode(mode) {
    this.toggleCallbackModeEvent.emit(mode);
  }

  snapMode() {
    this.snapModeEvent.emit();
  }

  orthogonalMode() {
    this.orthogonalEvent.emit();
  }

  shortagePath() {
    this.shortagePathEvent.emit();
  }
  // enableFBS() {
  //   this.enableFBSEvent.emit();
  // }
  arrowAnimation() {
    this.arrowAnimationEvent.emit();
  }
  dynamic() {
    this.dynamicEvent.emit();
  }

  toggleTextBoxMode() {
    this.toggleTextBoxModeEvent.emit();
  }

  uploadFile() {
    this.uploadFileEvent.emit();
  }
}
