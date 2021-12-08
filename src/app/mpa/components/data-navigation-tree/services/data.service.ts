import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { DataItem } from '../objects/data-item';
import {AuthenticatedSerializableObjectUploaderService} from '../../../../core/services/authenticated-serializable-object-uploader.service';
import v1 from 'uuid/v1';
import {AuthGuard} from '../../../../core/services/auth-guard.service';
import {GetDateService} from '../../../../core/services/get-date.service';
import {ExperimentJSONObject} from '../../../objects/experimentjson';
import {MatDialog} from '@angular/material';
import {DeleteWarningDialogComponent} from '../../../../core/components/dialog/delete-warning-dialog.component';
import {error} from 'util';
import {Endpoints} from '../../../../core/services/webserveraddress.service';
// import {type} from 'os';

export interface DataChangeObj {
  event: String;
  currentNodeUuid: string; // node whose ViewRef is currently displayed
  targetNodeUuid: string; // node which is deleted/created
  finalNodeUuid: string; // node whose viewRef will be rendered after change
}

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

  private initDataChange = {
    event: undefined,
    currentNodeUuid: undefined,
    targetNodeUuid: undefined,
    finalNodeUuid: undefined};

  public dataMap = new BehaviorSubject<Map<string, DataItem>>(undefined);
  public dataChange = new BehaviorSubject<DataChangeObj>(this.initDataChange);
 // private _dataItems: DataItem[];
  private _dataItemMap: Map<string, DataItem>;

  // uncomment when server is running properly
  constructor(private authGuard: AuthGuard,
              private jsonUploader: AuthenticatedSerializableObjectUploaderService,
              private getDateService: GetDateService,
              private dialog: MatDialog) {
      if (this.authGuard.loggedIn()) {
        this.jsonUploader.getObj<DataItem[]>(Endpoints.GET_USER_DATA).subscribe(res => {
          const newMap = new Map();
          res.forEach(obj => {
            newMap.set(obj.uuid, obj);
          });
          this.dataMap.next(newMap);
        });
        // test data from server
        // newMap.set(key, {
        //   displayName: 'a user',
        //   icon: 'account_circle',
        //   children: [],
        //   uuid: key,
        //   type: 'user',
        // });

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

    // updates userdata when data Map is changed
    this.dataMap.subscribe(value => {
      this._dataItemMap = value;
      const list = [];
      if (value !== undefined) {
        if (value.size !== 0) {
          value.forEach(val => {
            list.push(val);
          });
          this.jsonUploader.postObj(list, Endpoints.UPDATE_USER_DATA).subscribe(result => {
            if (result != null) {
              console.log(list);
              // value = result;
            }
          }), error(error => {
            //TODO: dont update!
          });
        }
      }
    });
  }
  // uncomment till here

  // Following lines added due to server error. Delete if server is running properly.
  // constructor(private authGuard: AuthGuard,
  //             private jsonUploader: AuthenticatedSerializableObjectUploaderService,
  //             private getDateService: GetDateService,
  //             private dialog: MatDialog) {
  //
  //   if (this.authGuard.loggedIn()) {
  //     const key = v1();
  //     const newMap = new Map();
  //     newMap.set(key, {
  //       displayName: 'a user',
  //       icon: 'account_circle',
  //       children: [],
  //       uuid: key,
  //       type: 'user',
  //     });
  //     this.dataMap.next(newMap);
  //   } else {
  //     const key = v1();
  //     const newMap = new Map();
  //     newMap.set(key, {
  //       displayName: 'no user',
  //       icon: 'account_circle',
  //       children: [],
  //       uuid: key,
  //       type: 'user'
  //     });
  //     this.dataMap.next(newMap);
  //   }
  //
  //   // '/mpacloud/v1/getuserdata'
  //   this.dataMap.subscribe(value => {
  //     this._dataItemMap = value;
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': authGuard.getUserAuthorization().toString()});
  //     this.jsonUploader.postObj(value, '/mpacloud/v1/updateuserdata').subscribe(result => {
  //       if (result != null) {
  //         value = result;
  //       }
  //     });
  //   });
  // }
  // remove till here

  addExperiment(parentUuid: string, experimentName: string) {

    /**
     * parentUuid - uuid of parent node element, i.e. element where this function was invoked from
     * experimentName - name that is displayed to the user
     */

    const newExperimentUUID = v1();

    // object for data map
    const newExperiment = {
      displayName: experimentName,
      icon: 'computer',
      children: [],
      uuid: newExperimentUUID,
      type: 'experiment',
      parent: parentUuid,
      creation_date: this.getDateService.getDate().toString(),
      description: '',
    };

    // object for server
    // TODO: set data from input
    const dbExperiment = new ExperimentJSONObject();
    dbExperiment.exp_id = newExperimentUUID;
    dbExperiment.name = newExperiment.displayName;
    dbExperiment.description = newExperiment.description;
    dbExperiment.creationDate = newExperiment.creation_date;

    this.jsonUploader.postObj(dbExperiment, Endpoints.CREATE_EXPERIMENT).subscribe(result => {
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
    this.dataChange.next({
      event: 'add',
      currentNodeUuid: parentUuid,
      targetNodeUuid: newExperimentUUID, // 'modified' node
      finalNodeUuid: newExperimentUUID // node whose content should be rendered after creation
    });
  }

  addProteinDatabase(parentUuid: string, dbName: string) {

    /**
     * parentUuid - uuid of parent node element, i.e. element where this function was invoked from
     * dbName - name that is displayed to the user
     */

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
    this.updateDataItems();
    this.dataChange.next({
      event: 'addDB',
      currentNodeUuid: parentUuid,
      targetNodeUuid: newProtDBUUID,
      finalNodeUuid: newProtDBUUID});
  }

  addFolder(parentUuid: string, folderName: string) {

    /**
     * parentUuid - uuid of parent node element, i.e. element where this function was invoked from
     * folderName - name that is displayed to the user
     */

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
    this.dataChange.next( {
      event: 'add',
      currentNodeUuid: parentUuid,
      targetNodeUuid: newFolderUUID,
      finalNodeUuid: newFolderUUID
    });
  }

  removeNode(targetNodeUuid: string, currentNodeUuid: string, finalNodeUuid: string): Observable<boolean> {
    const nodeName = this._dataItemMap.get(targetNodeUuid).displayName;
    const result = new Subject<boolean>();

    const dialogRef = this.dialog.open(DeleteWarningDialogComponent, {
      disableClose: true,
      data: {
        dialogPrompt: 'Are you sure you want to delete',
        nodeName: nodeName
      }
    });

    dialogRef.afterClosed().subscribe(event => {
      if (event === 'delete') {
        this.executeDelete(targetNodeUuid, currentNodeUuid, finalNodeUuid);
        result.next(true);
      } else {
        result.next(false);
      }
    });
    return result.asObservable();
  }

  executeDelete(targetNodeUuid: string, currentNodeUuid: string, finalNodeUuid: string) {

    /**
     * targetNodeUuid - node that will be deleted
     * currentNodeUuid - node where this functions is invoked from (node to be deleted or a 'master node')
     * finalNodeUuid (optional) - node whose content will be rendered after deletion
     */

    const item = this._dataItemMap.get(targetNodeUuid);
    const parent = item.parent;

    const parentItem = this._dataItemMap.get(parent);
    parentItem.children.splice(parentItem.children.indexOf(targetNodeUuid), 1);

    let children = item.children;
    let newchildren = [];
    let family = [targetNodeUuid];
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

    this.updateDataItems();
    this.dataChange.next({
      event: 'removeNode',
      currentNodeUuid: currentNodeUuid,
      targetNodeUuid: targetNodeUuid,
      finalNodeUuid: finalNodeUuid
    });
  }

  private updateDataItems() {
    this.dataMap.next(this._dataItemMap);
  }

  addPeaklist(parentUuid: string, displayName: string) {
    const newPeaklistUUID = v1();
    const newPeaklist = {
      displayName: displayName,
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
    this.dataChange.next({
      event: 'addPeaklist',
      currentNodeUuid: parentUuid,
      targetNodeUuid: newPeaklistUUID,
      finalNodeUuid: parentUuid
    });
  }

  addSearch(parentUuid: string, displayName: string) {
    const newSearchUUID = v1();
    const newSearch = {
      displayName: displayName,
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
    this.dataChange.next({
      event: 'addSearch',
      currentNodeUuid: parentUuid,
      targetNodeUuid: newSearchUUID,
      finalNodeUuid: parentUuid
    });
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
