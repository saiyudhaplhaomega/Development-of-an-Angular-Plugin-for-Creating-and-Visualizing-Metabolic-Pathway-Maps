import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataItem } from '../objects/data-item';
/*import { JsonUploaderService } from './json-uploader.service';*/
import { AuthGuard } from '../../../../core/services/auth-guard.service';
import { HttpHeaders } from '@angular/common/http';
import {AuthenticatedSerializableObjectUploaderService} from '../../../../core/services/authenticated-serializable-object-uploader.service';
import v1 from 'uuid/v1';
import { AuthService } from 'angularx-social-login';
import { NavService } from './nav.service';

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

  public dataChange = new BehaviorSubject<String>(undefined);

  private _dataItems: DataItem[];

  constructor(private authService: AuthService,
    private jsonUploader: AuthenticatedSerializableObjectUploaderService) {
    this.authService.authState.subscribe(user => {
      console.log(user);
      if (user !== null && user !== undefined) {
        const newData = [{
          displayName: user.name,
          icon: 'account_circle',
          children: [],
          uuid: v1(),
          type: 'user',
        }];
        //const headers = new HttpHeaders({
          //    'Content-Type': 'application/json',
            //  Authorization: this.authService.getIDToken()});
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
      this._dataItems = value;
    //  if (this.authGuardService.getServerAuthState()) {
      //  const headers = new HttpHeaders({
       // 'Content-Type': 'application/json',
       // Authorization: authGuardService.getIDToken()});
        //this.jsonUploader.postObj(value, 'mpacloud/v1/updateuserdata').subscribe(result => {
          //if (result != null) {
            //value = result;
          //}
        //});
      //}
    });
  }

  addExperiment(parentUuid) {
    const newExperimentUUID = v1();
    const newExperiment = {
      displayName: 'new experiment',
      icon: 'computer',
      children: [],
      uuid: newExperimentUUID,
      type: 'experiment',
      parent: parentUuid,
    };
    this._dataItems.forEach( item => {
      if (item.uuid === parentUuid) {
        item.children.push(newExperimentUUID);
      }
    });
    this._dataItems.push(newExperiment);
    console.log(this._dataItems);
    this.updateDataItems();
    this.dataChange.next('addExperiment');
  }

  addFolder(parentUuid: string) {
    const newFolderUUID = v1();
    const newFolder = {
      displayName: 'new folder',
      icon: 'folder',
      children: [],
      uuid: newFolderUUID,
      type: 'folder',
      parent: parentUuid,
    };
    this._dataItems.forEach( item => {
      if (item.uuid === parentUuid) {
        item.children.push(newFolderUUID);
        return;
      }
    });
    this._dataItems.push(newFolder);
    console.log(this._dataItems);
    this.updateDataItems();
    this.dataChange.next('addFolder');
  }

  removeFolder(folderUuid: string) {
    let parent = '';
    let children = [];
    let deletedItem;

    this._dataItems.forEach( item => {
      if (item.uuid === folderUuid) {
        children = item.children;
        parent = item.parent;
        deletedItem = item;
        return;
      }
    });

    this._dataItems.forEach( item => {
      if (item.uuid === parent) {
        item.children.splice(item.children.indexOf(folderUuid), 1);
        item.children = item.children.concat(children);
      } else if (children.indexOf(item.uuid) > -1) {
        item.parent = parent;
      }
    });
    this._dataItems.splice(this._dataItems.indexOf(deletedItem), 1);
    this.updateDataItems();
    this.dataChange.next('removeFolder');
  }

  private updateDataItems() {
    this.dataItems.next(this._dataItems);
  }
}
