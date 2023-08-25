import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
})
export class LoginButtonComponent {
  @Output() buttonClick = new EventEmitter<any>();
  @Input() disabled = false;

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
