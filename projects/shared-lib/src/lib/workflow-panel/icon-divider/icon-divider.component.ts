import { Component, Input, OnInit } from '@angular/core';
import { WorkflowPanelService } from '../services/workflow-panel.service';
import { PanelOrientation } from '../models/workflow-panel.model';

@Component({
  selector: 'shared-icon-divider',
  templateUrl: './icon-divider.component.html',
  styleUrls: ['./icon-divider.component.scss'],
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
