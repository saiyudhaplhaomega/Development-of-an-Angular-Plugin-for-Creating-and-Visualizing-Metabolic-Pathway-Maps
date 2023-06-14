import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { WorkflowPanelDirective } from './workflow-panel-directive';

@Component({
  selector: 'lib-workflow-panel',
  templateUrl: './workflow-panel.component.html',
  styleUrls: ['./workflow-panel.component.scss'],
})
export class WorkflowPanelComponent implements AfterContentInit {
  @Input() showDividerIcon: boolean = true;

  @ContentChildren(WorkflowPanelDirective)
  panels!: QueryList<WorkflowPanelDirective>;

  ngAfterContentInit() {
    console.log(this.panels);
  }
}
