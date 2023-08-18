import { Component, OnInit } from '@angular/core';
import { AuthService, NavigationRoute } from 'shared-lib';




@Component({
  selector: 'prophane-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'prophane';

  constructor(private authService: AuthService) {}
    ngOnInit(): void {
      this.authService.initializeOAuth();
    }


}
