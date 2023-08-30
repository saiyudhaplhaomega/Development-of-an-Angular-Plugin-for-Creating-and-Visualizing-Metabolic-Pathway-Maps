import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { ErrorStatusProviderService } from '../../services/error-status-provider.service';

@Component({
  selector: 'app-error-page-component',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorCode: number;
  errorMessage: string;

  constructor(
    private errorStatusProvider: ErrorStatusProviderService,
    private router: Router) { }

  ngOnInit() {
    this.errorCode = this.errorStatusProvider.errorCode;
    this.setErrorMessage(this.errorCode);
  }

  setErrorMessage(errorCode: number) {
    if (errorCode === 0) {
      this.errorMessage = 'We don\'t know what happened :o';
    } else if (errorCode < 500 && errorCode !== 404) {
      this.errorMessage = 'The error occured on client side.';
    } else if (errorCode === 404) {
      this.errorMessage = 'Error code 404. The requested resources are not available.';
    } else if (errorCode > 500) {
      this.errorMessage = 'We messed it up! A server error occured.';
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
