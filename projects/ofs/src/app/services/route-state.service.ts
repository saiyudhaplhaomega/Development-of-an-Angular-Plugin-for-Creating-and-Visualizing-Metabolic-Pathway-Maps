import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteStateService {
  previousRoute: BehaviorSubject<string>;
  currentRoute: BehaviorSubject<string>;

  constructor() {
    this.previousRoute = new BehaviorSubject(undefined);
    this.currentRoute = new BehaviorSubject(undefined);
  }

  setCurrentRoute(route: string) {
    this.previousRoute.next(this.currentRoute.value);
    this.currentRoute.next(route);
  }
}
