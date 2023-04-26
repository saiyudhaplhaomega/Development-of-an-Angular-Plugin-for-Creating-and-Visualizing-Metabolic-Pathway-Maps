import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ofsCarouselItem]',
})
export class CarouselItemDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
