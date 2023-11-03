import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WorkflowService } from '../services/workflow.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'ofs-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {
  constructor() {}
}
