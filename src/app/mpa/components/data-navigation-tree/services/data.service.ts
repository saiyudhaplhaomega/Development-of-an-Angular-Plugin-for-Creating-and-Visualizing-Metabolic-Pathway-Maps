import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { DataItem } from '../objects/data-item';
import {HttpClientService} from '../../../../core/services/http-client.service';
import {AuthGuard} from '../../../../core/services/auth-guard.service';
import {GetDateService} from '../../../../core/services/get-date.service';
import {ExperimentJSONObject} from '../../../objects/experimentjson';
import {MatDialog} from '@angular/material';
import {DeleteWarningDialogComponent} from '../../../../core/components/dialog/delete-warning-dialog.component';
import {error} from 'util';
import {Endpoints} from '../../../../core/services/webserveraddress.service';
import {dataNodeIdGenerator} from './dataNodeIdGenerator';
// import {type} from 'os';

export enum NodeType {
  Experiment = 'experiment',
  ProteinDB = 'proteindb',
  PeakList = 'peaklist',
  SearchResult = 'searchresult',
  Folder = 'folder',
}

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

  private initDataChange = {
    event: undefined,
    currentNodeUuid: undefined,
    targetNodeUuid: undefined,
    finalNodeUuid: undefined};

  public dataMap = new BehaviorSubject<Map<string, DataItem>>(undefined);
  public dataChange = new BehaviorSubject<DataChangeObj>(this.initDataChange);
  private _dataItemMap: Map<string, DataItem>;

  // uncomment when server is running properly
  constructor(private authGuard: AuthGuard,
              private jsonUploader: HttpClientService,
              private getDateService: GetDateService,
              private dialog: MatDialog) {
      if (this.authGuard.loggedIn()) {
        this.jsonUploader.getObject<DataItem[]>(Endpoints.GET_USER_DATA).subscribe(res => {
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
        const key = dataNodeIdGenerator(this._dataItemMap);
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
      const list: DataItem[] = [];
      if (value !== undefined) {
        if (value.size !== 0) {
          value.forEach(val => {
            list.push(val);
          });
          this.jsonUploader.postObject<DataItem[], DataItem[]>(list, Endpoints.UPDATE_USER_DATA).subscribe(result => {
            if (result != null) {
              console.log(list);
              // value = result;
            }
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

  addNodeObj(parentId: string, nodeName: string, nodeType: NodeType) {

    const newNodeId = dataNodeIdGenerator(this._dataItemMap);

    const dataChangeObj = {
      event: 'add',
      currentNodeUuid: parentId,
      targetNodeUuid: newNodeId,
      finalNodeUuid: newNodeId
    };

    const nodeObj: DataItem = {
      displayName: nodeName,
      children: [],
      uuid: newNodeId,
      type: nodeType,
      parent: parentId,
      icon: undefined
    };

    switch (nodeType) {
      case 'experiment':
        nodeObj.icon = 'computer';
        nodeObj.creation_date = this.getDateService.getDate().toString();
        nodeObj.description = '';

        this.updateExperiment(nodeObj);
        break;
      case 'proteindb':
        nodeObj.icon = 'fingerprint';
        dataChangeObj.event = 'addDB';
        break;
      case 'folder':
        nodeObj.icon = 'folder';
        break;
      case 'peaklist':
        nodeObj.icon = 'folder';
        dataChangeObj.event = 'addPeaklist';
        dataChangeObj.finalNodeUuid = parentId;
        break;
      case 'searchresult':
        nodeObj.icon = 'folder';
        dataChangeObj.event = 'addSearch';
        dataChangeObj.finalNodeUuid = parentId;
        break;
    }

    const item = this._dataItemMap.get(parentId);
    item.children.push(newNodeId);
    this._dataItemMap.set(parentId, item);

    this._dataItemMap.set(newNodeId, nodeObj);
    this.updateDataItems();
    this.dataChange.next(dataChangeObj);
  }

  updateExperiment(nodeObj) {
    // TODO: Set data from input
    const dbExperiment = new ExperimentJSONObject();
    dbExperiment.exp_id = nodeObj.uuid;
    dbExperiment.name = nodeObj.displayName;
    dbExperiment.description = nodeObj.description;
    dbExperiment.creationDate = nodeObj.creation_date;

    this.jsonUploader.postObject<ExperimentJSONObject, ExperimentJSONObject>(dbExperiment, Endpoints.CREATE_EXPERIMENT).subscribe(result => {
      if (result != null) {
        console.log(result);
        // value = result;
      }
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
