import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ofs-stepper-control-buttons',
  templateUrl: './stepper-control-buttons.component.html',
  styleUrls: ['./stepper-control-buttons.component.scss'],
})
export class StepperControlButtonsComponent implements OnInit {
  @Input() showPrev: Boolean = true;
  @Input() showNext: Boolean = true;

  @Input() disablePrev: Boolean = false;
  @Input() disableNext: Boolean = false;

  @Output() onNavigation: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onNavigate(direction: string) {
    this.onNavigation.emit(direction);
  }
}
