import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { WorkflowPanelDirective } from './workflow-panel-directive';
import { WorkflowPanelService } from './workflow-panel.service';
import { PanelOrientation } from './workflow-panel.model';

@Component({
  selector: 'lib-workflow-panel',
  templateUrl: './workflow-panel.component.html',
  styleUrls: ['./workflow-panel.component.scss'],
})
export class WorkflowPanelComponent implements OnInit {
  @Input() showDividerIcon: boolean = true;
  @Input() orientation: PanelOrientation = PanelOrientation.VERTICAL;

  @ContentChildren(WorkflowPanelDirective)
  panels!: QueryList<WorkflowPanelDirective>;

  constructor(private panelService: WorkflowPanelService) {}

  ngOnInit() {
    this.panelService.orientation = this.orientation;
  }
}
