import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NetworkManagerService } from '../../services/network-manager.service';
import { NetworkCanvasService } from '../../services/network-canvas.service';

@Component({
  selector: 'vis-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
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
  @Output() toggleCallbackModeEvent = new EventEmitter<string>();
  @Output() snapModeEvent = new EventEmitter<void>();
  @Output() orthogonalEvent = new EventEmitter<void>();
  @Output() shortagePathEvent = new EventEmitter<void>();
  @Output() arrowAnimationEvent = new EventEmitter<void>();
  @Output() dynamicEvent = new EventEmitter<void>();
  @Output() toggleTextBoxModeEvent = new EventEmitter<void>();
  @Output() uploadFileEvent = new EventEmitter<void>();
  constructor(
    private networkManagerService: NetworkManagerService,
    private networkCanvasService: NetworkCanvasService
  ) {}
  searchEnable() {
    this.searchEvent.emit();
  }

  zoomIn() {
    this.zoomInEvent.emit();
  }

  zoomOut() {
    this.zoomOutEvent.emit();
  }

  enableToolTip() {
    this.toolTipEvent.emit();
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

  toggleCallbackMode(mode: string) {
    this.toggleCallbackModeEvent.emit(mode);
  }

  snapMode() {
    this.snapModeEvent.emit();
  }

  orthogonalMode() {
    this.orthogonalEvent.emit();
  }

  shortagePathEnabled() {
    this.shortagePathEvent.emit();
  }

  arrowAnimation() {
    this.arrowAnimationEvent.emit();
  }

  dynamic() {
    this.dynamicEvent.emit();
  }

  toggleTextBoxMode() {
    this.toggleTextBoxModeEvent.emit();
  }
  showTooltip(){
    this.toolTipEvent.emit();
  }
  shortagePath() {
    this.shortagePathEvent.emit();
  }

  /*uploadFile() {
    this.uploadFileEvent.emit();
  }*/
}
