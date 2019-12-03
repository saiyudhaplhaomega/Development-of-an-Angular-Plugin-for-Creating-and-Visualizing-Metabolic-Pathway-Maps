import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataItem } from '../objects/data-item';
/*import { JsonUploaderService } from './json-uploader.service';*/
import { AuthGuard } from '../../../../main/services/auth-guard.service';
import { HttpHeaders } from '@angular/common/http';
import {AuthenticatedSerializableObjectUploaderService} from '../../../../main/services/authenticated-serializable-object-uploader.service';
import v1 from 'uuid/v1';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dataItems = new BehaviorSubject<DataItem[]>(
    [
      {
        displayName: 'unknown user',
        icon: 'account_circle',
        children: [],
        uuid: v1(),
        type: 'user'
      }
    ]
  );

  constructor(private authGuardService: AuthGuard, private jsonUploader: AuthenticatedSerializableObjectUploaderService) {
    this.authGuardService.user.subscribe(user => {
      console.log(user);
      if (user !== null && user !== undefined) {
        const newData = [{
          displayName: user.name,
          icon: 'account_circle',
          children: [],
          uuid: v1(),
          type: 'user',
        }];
        const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: this.authGuardService.getSessionID()});
        //this.jsonUploader.postObj(newData, 'mpacloud/v1/updateuserdata').subscribe(result => {
          //if (result != null) {
            //newData = result;
            //this.dataItems.next(newData);
          //} else {
            this.dataItems.next(newData);
          //}
        //});
      } else {
        this.dataItems.next(
          [
            {
              displayName: 'no user',
              icon: 'account_circle',
              children: [],
              uuid: v1(),
              type: 'user'
            }
          ]
        );
      }
    });
    this.dataItems.subscribe(value => {
      if (this.authGuardService.getServerAuthState()) {
        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authGuardService.getSessionID()});
        //this.jsonUploader.postObj(value, 'mpacloud/v1/updateuserdata').subscribe(result => {
          //if (result != null) {
            //value = result;
          //}
        //});
      }
    });
  }
}
