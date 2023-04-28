import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';

export const MAX_WIDTH = '1536px';
export const PANEL_WIDTH = '512px';
@Component({
  selector: 'ofs-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective)
  items: QueryList<CarouselItemDirective>;

  @ViewChildren('carousel_item', { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;

  @ViewChild('carousel') private carousel: ElementRef;

  @Input() timing = '250ms ease-in';
  @Input() showControls = true;

  private itemWidth: number;
  private currentSlide = 0;

  carouselWrapperStyle = {};

  ngAfterViewInit() {
    console.log(this.itemsElements);

    this.itemWidth =
      this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    this.carouselWrapperStyle = {
      width: `${this.itemWidth}px`,
    };
  }

  next() {
    if (this.currentSlide + 1 === this.items.length) return;

    this.currentSlide = (this.currentSlide + 1) % this.items.length;

    const offset = this.currentSlide * this.itemWidth;

    this.carousel.nativeElement.style.transform = `translateX(-${offset}px)`;
  }

  prev() {
    if (this.currentSlide === 0) return;

    this.currentSlide =
      (this.currentSlide - 1 + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    this.carousel.nativeElement.style.transform = `translateX(-${offset}px)`;
  }
}
