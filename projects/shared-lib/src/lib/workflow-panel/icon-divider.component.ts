import { Component, Input, OnInit } from '@angular/core';
import { WorkflowPanelService } from './workflow-panel.service';
import { PanelOrientation } from './workflow-panel.model';

@Component({
  selector: 'shared-icon-divider',
  templateUrl: './icon-divider.component.html',
  styleUrls: ['./workflow-panel.component.scss'],
})
export class IconDividerComponent implements OnInit {
  constructor(private panelService: WorkflowPanelService) {}

  @Input() showIcon: boolean = true;
  isVertical: Boolean = false;

  ngOnInit(): void {
    this.isVertical =
      this.panelService.orientation === PanelOrientation.VERTICAL;
  }
}
