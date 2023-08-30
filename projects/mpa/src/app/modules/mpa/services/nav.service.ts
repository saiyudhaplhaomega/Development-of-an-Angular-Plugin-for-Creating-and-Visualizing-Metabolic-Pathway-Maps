import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataItem} from '../model/data-item';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  // the nav service holds this subject variable which is triggered by navigateOutlet() method
  navigateComponentEvent$ = new Subject<DataItem>();

  navigateOutlet(dataItem: DataItem) {
    this.navigateComponentEvent$.next(dataItem);
  }

}
