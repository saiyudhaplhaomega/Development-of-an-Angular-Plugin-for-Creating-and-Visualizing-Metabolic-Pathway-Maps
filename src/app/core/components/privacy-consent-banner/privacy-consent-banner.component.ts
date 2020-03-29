import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-privacy-consent-banner',
  templateUrl: './privacy-consent-banner.component.html',
  styleUrls: ['./privacy-consent-banner.component.css'],
  animations: [
    trigger('policyConsent', [
      state('initial', style({
        backgroundColor: '#001933',
        height: '0px',
        overflow: 'hidden',
      })),
      state('final', style({
        backgroundColor: '#001933',
        width: '100%',
        height: '100px',
      })),
      transition('initial=>final', animate('300ms 500ms ease-in')),
      transition('final=>initial', animate('0ms 500ms ease-out'))
    ])]
})

export class PrivacyConsentBannerComponent {

  consentDialogStatus = 'initial';
  expiryDays= 30;

  constructor () {
  }

  showBanner() {
    this.consentDialogStatus = 'final';
  }

  hideBanner() {
    console.log(this.hasConsented());
    this.consentDialogStatus = 'initial';
    console.log(this.hasConsented());
  }

  getCurrentTimestamp() {
    return new Date().getTime();
  }

  isExpired(timestamp) {
    if (this.getCurrentTimestamp() - timestamp >= this.expiryDays * 86400000) {
      return true;
    }
    else {
      return false;
    }
  }

  hasConsented() {
    let value = parseInt(localStorage.getItem("prophane_mpa_policy_consent"));
    if (value === null || this.isExpired(value)) {
      return false;
    }
    else {
      return true;
    }
  }

  consent() {
    this.setConsent();
    this.hideBanner();
  }

  setConsent() {
    localStorage.setItem('prophane_mpa_policy_consent', this.getCurrentTimestamp().toString());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.hasConsented() && this.consentDialogStatus === 'initial') {
      this.showBanner();
    }
  }
}
