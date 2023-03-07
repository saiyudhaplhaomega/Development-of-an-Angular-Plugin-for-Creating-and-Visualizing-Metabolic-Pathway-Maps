import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InputFormComponent } from '../../input-form/input-form';

@Component({
  selector: 'shared-guest-input',
  templateUrl: './guest-input.component.html',
  styleUrls: ['./guest-input.component.scss'],
})
export class GuestInputComponent extends InputFormComponent {
  @Output() guestLoginEvent = new EventEmitter<string>();

  guestEMail: FormControl<string>;

  constructor(public builder: FormBuilder) {
    super(builder);
  }

  ngOnInit(): void {
    this.guestEMail = new FormControl('', [Validators.email]);
  }

  continueClick() {
    this.guestLoginEvent.emit(this.guestEMail.getRawValue());
  }
}
