import {Component, OnDestroy} from '@angular/core';
// import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-prophane-policy-consent',
  templateUrl: './prophane-policy-consent.component.html',
  styleUrls: ['./prophane-policy-consent.component.css']
})
export class ProphaneAboutComponent implements OnDestroy {

  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor() { }

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
