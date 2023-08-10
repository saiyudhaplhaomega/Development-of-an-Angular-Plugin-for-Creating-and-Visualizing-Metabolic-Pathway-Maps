import { Component, OnInit } from '@angular/core';
import { AuthService } from 'dist/shared-lib';

//import { AuthGuard } from 'dist/shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeOAuth();
  }
}
