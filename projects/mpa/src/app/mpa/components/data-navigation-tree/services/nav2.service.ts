import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataItem} from '../objects/data-item';

@Injectable({
  providedIn: 'root'
})
export class NavService2 {

  // the nav service holds this subject variable which is triggered by navigateOutlet() method
  navigateComponentEvent$ = new Subject<DataItem>();

  navigateOutlet(dataItem: DataItem) {
    this.navigateComponentEvent$.next(dataItem);
  }

}
