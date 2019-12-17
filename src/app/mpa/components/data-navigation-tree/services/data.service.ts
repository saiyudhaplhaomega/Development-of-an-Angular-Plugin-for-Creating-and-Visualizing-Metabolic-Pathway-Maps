import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataItem } from '../objects/data-item';
import {AuthenticatedSerializableObjectUploaderService} from '../../../../core/services/authenticated-serializable-object-uploader.service';
import v1 from 'uuid/v1';
import { AuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 /* public dataItems = new BehaviorSubject<DataItem[]>(
    [
      {
        displayName: 'unknown user',
        icon: 'account_circle',
        children: [],
        uuid: v1(),
        type: 'user'
      }
    ]
  ); */

  public dataMap = new BehaviorSubject<Map<string, DataItem>>(undefined);
  public dataChange = new BehaviorSubject<String>(undefined);
 // private _dataItems: DataItem[];
  private _dataItemMap: Map<string, DataItem>;

  constructor(private authService: AuthService,
    private jsonUploader: AuthenticatedSerializableObjectUploaderService) {
    this.authService.authState.subscribe(user => {
      console.log(user);
      if (user !== null && user !== undefined) {
        const key = v1();
        const newMap = new Map();
        newMap.set(key, {
          displayName: user.name,
          icon: 'account_circle',
          children: [],
          uuid: key,
          type: 'user',
        });
        //const headers = new HttpHeaders({
          //    'Content-Type': 'application/json',
            //  Authorization: this.authService.getIDToken()});
        //this.jsonUploader.postObj(newData, 'mpacloud/v1/updateuserdata').subscribe(result => {
          //if (result != null) {
            //newData = result;
            //this.dataItems.next(newData);
          //} else {
            this.dataMap.next(newMap);
          //}
        //});
      } else {
        const key = v1();
        const newMap = new Map();
        newMap.set(key, {
          displayName: 'no user',
          icon: 'account_circle',
          children: [],
          uuid: key,
          type: 'user'
        });
        this.dataMap.next(newMap);
      }
    });
    this.dataMap.subscribe(value => {
      this._dataItemMap = value;
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

    const item = this._dataItemMap.get(parentUuid);
    item.children.push(newExperimentUUID);
    this._dataItemMap.set(parentUuid, item);

    this._dataItemMap.set(newExperimentUUID, newExperiment);
    console.log(this._dataItemMap);
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
    const item = this._dataItemMap.get(parentUuid);
    item.children.push(newFolderUUID);
    this._dataItemMap.set(parentUuid, item);

    this._dataItemMap.set(newFolderUUID, newFolder);
    this.updateDataItems();
    this.dataChange.next('addFolder');
  }

  removeFolder(folderUuid: string) {
    const item = this._dataItemMap.get(folderUuid);
    const parent = item.parent;

    const parentItem = this._dataItemMap.get(parent);
    parentItem.children.splice(parentItem.children.indexOf(folderUuid), 1);

    let children = item.children;
    let newchildren = [];
    let family = [folderUuid];
    while (children.length > 0) {
      for (const child_item of this._dataItemMap.values()) {
        if (children.indexOf(child_item.uuid) > -1) {
          newchildren = newchildren.concat(child_item.children);
        }
      }
      family = family.concat(children);
      children = newchildren;
      newchildren = [];
    }

    family.forEach(id => {
      this._dataItemMap.delete(id);
    });

    console.log(family);
    this.updateDataItems();
    this.dataChange.next('removeFolder');
  }

  private updateDataItems() {
    this.dataMap.next(this._dataItemMap);
  }

  moveDataItem(newParentID: string, movedUUID: string) {
    // check if the newparentid is the child of the current movedid
    // TODO cleanup
    let family = [];
    const item = this._dataItemMap.get(movedUUID);
    let children = item.children;
    let newchildren = [];
    while (children.length > 0) {
      for (const child_item of this._dataItemMap.values()) {
        if (children.indexOf(child_item.uuid) > -1) {
          newchildren = newchildren.concat(child_item.children);
        }
      }
      family = family.concat(children);
      children = newchildren;
      newchildren = [];
    }

    console.log(family);
    if (family.indexOf(newParentID) > - 1) {
      return;
    }

    const parentItem = this._dataItemMap.get(newParentID);
    parentItem.children.push(movedUUID);
    this._dataItemMap.set(newParentID, parentItem);

    const movedItem = this._dataItemMap.get(movedUUID);
    const oldParentID = movedItem.parent;
    movedItem.parent = newParentID;
    this._dataItemMap.set(movedUUID, movedItem);

    const oldParentItem = this._dataItemMap.get(oldParentID);
    oldParentItem.children.splice(oldParentItem.children.indexOf(movedUUID), 1);
    this._dataItemMap.set(oldParentID, oldParentItem);

    // normal move
    this.updateDataItems();
  }
}
