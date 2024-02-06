import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[shared-step]',
})
export class StepDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
