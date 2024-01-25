import { Injectable } from '@angular/core';
import { PanelOrientation } from '../models/workflow-panel.model';

@Injectable({
  providedIn: 'any',
})
export class WorkflowPanelService {
  orientation: PanelOrientation;

  constructor() {}
}
