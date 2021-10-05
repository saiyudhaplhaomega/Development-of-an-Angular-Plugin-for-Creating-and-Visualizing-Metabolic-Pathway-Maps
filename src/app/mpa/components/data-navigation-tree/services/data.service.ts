import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataItem } from '../objects/data-item';
import {AuthenticatedSerializableObjectUploaderService} from '../../../../core/services/authenticated-serializable-object-uploader.service';
import v1 from 'uuid/v1';
import {AuthGuard} from '../../../../core/services/auth-guard.service';
import {HttpHeaders} from '@angular/common/http';
import {GetDateService} from '../../../../core/services/get-date.service';
import {ExperimentJSONObject} from '../../../objects/experimentjson';
// import {type} from 'os';


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

  // constructor(private authGuard: AuthGuard,
  //             private jsonUploader: AuthenticatedSerializableObjectUploaderService,
  //             private getDateService: GetDateService) {
  //     if (this.authGuard.loggedIn()) {
  //       this.jsonUploader.postObj<DataItem[]>([], 'mpacloud/v1/getUserData').subscribe(res => {
  //         const newMap = new Map();
  //         res.forEach(obj => {
  //           newMap.set(obj.uuid, obj);
  //         });
  //         this.dataMap.next(newMap);
  //       });
  //       // test data from server
  //       // newMap.set(key, {
  //       //   displayName: 'a user',
  //       //   icon: 'account_circle',
  //       //   children: [],
  //       //   uuid: key,
  //       //   type: 'user',
  //       // });
  //
  //     } else {
  //       const key = v1();
  //       const newMap = new Map();
  //       newMap.set(key, {
  //         displayName: 'no user',
  //         icon: 'account_circle',
  //         children: [],
  //         uuid: key,
  //         type: 'user'
  //       });
  //       this.dataMap.next(newMap);
  //     }
  //
  //   // '/mpacloud/v1/getuserdata'
  //   this.dataMap.subscribe(value => {
  //     this._dataItemMap = value;
  //     const list = [];
  //     if (value !== undefined) {
  //       if (value.size !== 0) {
  //         value.forEach(val => {
  //           list.push(val);
  //         });
  //         this.jsonUploader.postObj(list, 'mpacloud/v1/updateUserData').subscribe(result => {
  //           if (result != null) {
  //             console.log(list);
  //             // value = result;
  //           }
  //         });
  //       }
  //     }
  //   });
  // }

  // Following lines added due to server error. Delete if server is working.
  constructor(private authGuard: AuthGuard,
              private jsonUploader: AuthenticatedSerializableObjectUploaderService,
              private getDateService: GetDateService) {

    if (this.authGuard.loggedIn()) {
      const key = v1();
      const newMap = new Map();
      newMap.set(key, {
        displayName: 'a user',
        icon: 'account_circle',
        children: [],
        uuid: key,
        type: 'user',
      });
      this.dataMap.next(newMap);
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

    // '/mpacloud/v1/getuserdata'
    this.dataMap.subscribe(value => {
      this._dataItemMap = value;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authGuard.getUserAuthorization().toString()});
      this.jsonUploader.postObj(value, '/mpacloud/v1/updateuserdata').subscribe(result => {
        if (result != null) {
          value = result;
        }
      });
    });
  }
  // remove till here

  addExperiment(parentUuid: string,
                experimentName: string) {
    const newExperimentUUID = v1();
    const newExperiment = {
      displayName: experimentName,
      icon: 'computer',
      children: [],
      uuid: newExperimentUUID,
      type: 'experiment',
      parent: parentUuid,
      creation_date: this.getDateService.getDate().toString()
    };

    // TODO: set data from input
    const dbExperiment = new ExperimentJSONObject();
    dbExperiment.exp_id = newExperimentUUID;
    dbExperiment.name = newExperiment.displayName;
    dbExperiment.description = 'from_html';
    dbExperiment.creationDate = newExperiment.creation_date;

    this.jsonUploader.postObj(dbExperiment, 'mpacloud/v1/createExperiment').subscribe(result => {
      if (result != null) {
        console.log(result);
        // value = result;
      }
    });

    const item = this._dataItemMap.get(parentUuid);
    item.children.push(newExperimentUUID);
    this._dataItemMap.set(parentUuid, item);

    this._dataItemMap.set(newExperimentUUID, newExperiment);
    // console.log(this._dataItemMap);
    this.updateDataItems();
    this.dataChange.next('addExperiment');
  }

  addProteinDatabase(parentUuid: string, dbName: string) {
    const newProtDBUUID = v1();
    const newProtDB = {
      displayName: dbName,
      icon: 'fingerprint',
      children: [],
      uuid: newProtDBUUID,
      type: 'proteindb',
      parent: parentUuid,
    };

    const item = this._dataItemMap.get(parentUuid);
    item.children.push(newProtDBUUID);
    this._dataItemMap.set(parentUuid, item);

    this._dataItemMap.set(newProtDBUUID, newProtDB);
    console.log(this._dataItemMap);
    this.updateDataItems();
    this.dataChange.next('addProteinDB');
  }

  addFolder(parentUuid: string,
            folderName: string) {
    const newFolderUUID = v1();
    const newFolder = {
      displayName: folderName,
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

    console.log(this.dataMap);
    console.log(this._dataItemMap);
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

  addPeaklist(parentUuid: string) {
    const newPeaklistUUID = v1();
    const newPeaklist = {
      displayName: 'Peaklist',
      icon: 'folder',
      children: [],
      uuid: newPeaklistUUID,
      type: 'peaklist',
      parent: parentUuid,
    };
    const item = this._dataItemMap.get(parentUuid);
    item.children.push(newPeaklistUUID);
    this._dataItemMap.set(parentUuid, item);

    this._dataItemMap.set(newPeaklistUUID, newPeaklist);
    this.updateDataItems();
    this.dataChange.next('addPeaklist');

    console.log(this.dataMap);
    console.log(this._dataItemMap);
  }

  addSearch(parentUuid: string) {
    const newSearchUUID = v1();
    const newSearch = {
      displayName: 'Search Result',
      icon: 'folder',
      children: [],
      uuid: newSearchUUID,
      type: 'searchresult',
      parent: parentUuid,
    };
    const item = this._dataItemMap.get(parentUuid);
    item.children.push(newSearchUUID);
    this._dataItemMap.set(parentUuid, item);

    this._dataItemMap.set(newSearchUUID, newSearch);
    this.updateDataItems();
    this.dataChange.next('addSearch');

    console.log(this.dataMap);
    console.log(this._dataItemMap);
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
