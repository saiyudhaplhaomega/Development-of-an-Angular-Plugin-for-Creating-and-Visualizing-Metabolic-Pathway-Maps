import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavItem } from '../objects/nav-item';
/*import { JsonUploaderService } from './json-uploader.service';*/
import { AuthGuard } from '../../../../main/services/auth-guard.service';
import { HttpHeaders } from '@angular/common/http';
import {AuthenticatedSerializableObjectUploaderService} from '../../../../main/services/authenticated-serializable-object-uploader.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public NavItems = new BehaviorSubject<NavItem[]>(
    [
      {
        displayName: 'unknown user',
        icon: 'account_circle',
        route: 'user',
        children: [],
        uuid: 'uuid'
      }
    ]
  );

  constructor(private authGuardService: AuthGuard, private jsonUploader: AuthenticatedSerializableObjectUploaderService) {
    this.authGuardService.user.subscribe(user => {
      if (user !== null && user !== undefined) {
        let newData = [{
            displayName: user.name,
            icon: 'account_circle',
            route: 'user',
            children: [],
            uuid: 'uuid'}];

        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: this.authGuardService.getSessionID()});
        this.jsonUploader.postObj(newData, 'mpacloud/v1/getuserdata').subscribe(result => {
          if (result != null) {
            newData = result;
            this.NavItems.next(newData);
          } else {
            this.NavItems.next(newData);
          }
        });
      } else {
        this.NavItems.next(
          [
            {
              displayName: 'no user',
              icon: 'account_circle',
              route: 'user',
              children: [],
              uuid: 'uuid'
            }
          ]
        );
      }
    });
    this.NavItems.subscribe(value => {
      if (this.authGuardService.getServerAuthState()) {
        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authGuardService.getSessionID()});
        this.jsonUploader.postObj(value, 'mpacloud/v1/updateuserdata').subscribe(result => {
          if (result != null) {
            value = result;
          }
        });
      }
    });
  }
}
