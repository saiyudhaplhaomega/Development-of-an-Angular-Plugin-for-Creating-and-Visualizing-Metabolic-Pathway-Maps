import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[lib-workflowPanel]',
})
export class WorkflowPanelDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
