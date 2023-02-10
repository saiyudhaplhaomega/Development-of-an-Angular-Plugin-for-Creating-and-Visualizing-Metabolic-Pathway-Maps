import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthGuard } from 'dist/shared-lib';
import { UserToken } from 'dist/shared-lib';


@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.html',
  styleUrls: ['./page-footer.css']
})
export class FooterComponent implements OnInit {

  user: UserToken;
  guest: boolean;

  constructor(public authGuard: AuthGuard) {}

  ngOnInit(): void {
    this.authGuard.user.subscribe(res => {
      this.user = res;
    });
    this.authGuard.guest.subscribe(res => {
      this.guest = res;
    });
  }

}
