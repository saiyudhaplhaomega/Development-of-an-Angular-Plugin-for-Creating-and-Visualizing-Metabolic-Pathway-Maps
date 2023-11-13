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

export class PrivacyConsentBannerComponent implements OnInit, AfterViewInit{

  consentDialogStatus = 'initial';
  // 30
  expiryDays = 30;

  constructor() {
  }

  showBanner() {
    this.consentDialogStatus = 'final';
  }

  hideBanner() {
    this.consentDialogStatus = 'initial';
  }

  getCurrentTimestamp() {
    return new Date().getTime();
  }

  isExpired(timestamp) {
    return this.getCurrentTimestamp() - timestamp >= this.expiryDays * 86400000;
  }

  hasConsented() {
    const value = localStorage.getItem('tax2proteome_policy_consent');
    return !(value === null || this.isExpired(parseInt(value)));
  }

  consent() {
    this.setConsent();
    this.hideBanner();
  }

  setConsent() {
    localStorage.setItem('tax2proteome_policy_consent', this.getCurrentTimestamp().toString());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.hasConsented() && this.consentDialogStatus === 'initial') {
      this.showBanner();
    }
  }
}
