import { Component, OnInit } from '@angular/core';
//import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-prophane-policy-consent',
  templateUrl: './prophane-policy-consent.component.html',
  //styleUrls: ['./prophane-about.component.css']
})
export class ProphaneAboutComponent implements OnInit {

  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}
