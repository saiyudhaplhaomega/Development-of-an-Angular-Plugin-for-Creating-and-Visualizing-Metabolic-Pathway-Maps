import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export enum LoginType {
  GUEST,
  GOOGLE,
}

@Component({
  selector: 'shared-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.css'],
})
export class LoginButtonsComponent implements OnInit {
  @Output() click: EventEmitter<LoginType>;

  constructor() {
    this.click = new EventEmitter<LoginType>();
  }

  ngOnInit(): void {}

  onClick(type: number) {
    this.click.emit(type);
  }
}
