import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthGuard } from '../../services/auth-guard.service';
import { UserToken } from '../../objects/user-token';


@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.html',
  styleUrls: ['./page-footer.css']
})
export class FooterComponent implements OnInit {

  user: UserToken;
  guest: boolean;

  constructor(private authGuard: AuthGuard) {}

  ngOnInit(): void {
    this.authGuard.user.subscribe(res => {
      this.user = res;
    });
    this.authGuard.guest.subscribe(res => {
      this.guest = res;
    });
  }

}
