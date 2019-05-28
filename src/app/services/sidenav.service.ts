///<reference path="../../../node_modules/rxjs/internal/Subject.d.ts"/>
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class SidenavService {

  private isOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  public getOpened(): Observable<boolean> {
    return this.isOpened.asObservable();
  }

  public toggleOpened(): void {
    console.log('toggle opened: ' + this.isOpened.value);
    this.isOpened.next(!this.isOpened.value);
  }

}
