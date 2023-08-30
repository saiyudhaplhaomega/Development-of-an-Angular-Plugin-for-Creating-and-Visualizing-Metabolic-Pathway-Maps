import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { UserToken } from '../login/user-token';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.css'],
})
export class FooterComponent implements OnInit {

  user: UserToken;
  guest: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.user.subscribe((res) => {
    //   this.user = res;
    // });
    // this.authService.guest.subscribe((res) => {
    //   this.guest = res;
    // });
  }

}
