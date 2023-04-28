import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { WorkflowPanelDirective } from './workflow-panel-directive';

@Component({
  selector: 'ofs-workflow-panel',
  templateUrl: './workflow-panel.component.html',
  styleUrls: ['./workflow-panel.component.scss'],
})
export class WorkflowPanelComponent implements AfterContentInit {
  @ContentChildren(WorkflowPanelDirective)
  panels!: QueryList<WorkflowPanelDirective>;

  ngAfterContentInit() {
    console.log(this.panels);
  }
}
