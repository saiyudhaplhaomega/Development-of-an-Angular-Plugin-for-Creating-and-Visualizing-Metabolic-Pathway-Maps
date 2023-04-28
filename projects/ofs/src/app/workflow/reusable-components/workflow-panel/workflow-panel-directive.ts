import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[workflowPanel]',
})
export class WorkflowPanelDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
