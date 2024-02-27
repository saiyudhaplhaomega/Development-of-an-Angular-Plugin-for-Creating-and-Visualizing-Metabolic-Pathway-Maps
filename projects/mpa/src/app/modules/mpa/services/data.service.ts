import { Injectable } from '@angular/core';
import { AuthGuard, AuthService, DeleteWarningDialogComponent } from 'dist/shared-lib';
import { HttpClientService } from 'dist/shared-lib';
import { DataItem } from '../model/data-item';
import { Endpoints, WebserveraddressService } from '../../../mpawebserveraddress.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavService } from './nav.service';
import { DataItemMap } from '../model/data-item-map';
import { MatDialog } from '@angular/material/dialog';
import { ExperimentJSONObject } from '../model/experimentjson';
import { HttpParams } from '@angular/common/http';
import { ProtDBJSONObject } from '../model/protdbjson';

// TODO: properly set everywhere
export enum NodeType {
  User = 'user',
  Experiment = 'experiment',
  ProteinDB = 'proteindb',
  PeakList = 'peaklist',
  SearchResult = 'searchresult',
  Folder = 'folder',
  ExperimentComparison = 'experimentcomparison'
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // the dataMap is the main object containing the user data
  // TODO: replace with subject? BehaviourSubject emits the last value and thats why it needs an initial value (we dont have here)
  public dataMap = new BehaviorSubject<DataItemMap>(new DataItemMap());
  // TODO: using Subject on the other hand doesnt allow ".value"
  //public dataMap = new Subject<Map<number, DataItem>>();

  // the constructor has two tasks:
  // 1. calls the server to retrieve user data and initialize the dataMap
  // 2. sets up subscription to call server whenever dataMap is updated
  constructor(
    private authService: AuthService,
    private addressService: WebserveraddressService,
    private httpClientService: HttpClientService,
    private navService: NavService,
    private dialog: MatDialog
  ) {
    // if not logged in, will navigate to login page automatically and no action is taken
    if (this.authService.loggedIn()) {
      // the initial call to the server to retrieve the user data
      this.httpClientService
        .getObject<DataItem>(addressService.getEndpoint(Endpoints.GET_USER_DATA))
        .subscribe((rootNode) => {
          // from the json response that contains a list of data-items, we create a map and extract the user object
        const newMap = new DataItemMap();
          const user: DataItem = newMap.initializeAndReturnUser(rootNode);
          // once the dataMap object is initialized it is put into the dataMap BehaviourSubject
          this.dataMap.next(newMap);
          // once the data is available through the data map we will navigate to the user page
          this.navService.navigateOutlet(user);
        });
      // this subscription triggers the upload/update of userdata whenever a change occurred
      this.dataMap.subscribe((dataItemMap) => {
        // the hasData flag is used here to prevent an update before data is retrieved from the server
        if (dataItemMap !== undefined && dataItemMap.isInitialized) {
          // the map is transferred into a list which will be sent to the server
          // the call to send the user data to the server
          this.httpClientService
            .postObject<DataItem, DataItem>(
              dataItemMap.rootNode,
              addressService.getEndpoint(Endpoints.UPDATE_USER_DATA)
            )
            .subscribe((result) => {
              // TODO: do we need to look at the response?
              console.log('Updated userdata, no action taken.');
            });
        }
      });
    }
  }

  getDataItemFromId(id: number): DataItem {
    return this.dataMap.getValue().findSpecificNode(this.dataMap.getValue().rootNode, id);
  }

  updateNode(updateNode: DataItem): void {
    let mapCopy: DataItemMap = new DataItemMap();
    mapCopy.initializeAndReturnUser(this.dataMap.value.rootNode);
    const itemToUpdate = mapCopy.findSpecificNode(
      mapCopy.rootNode,
      updateNode.id
    );
    // TODO: update appropriate fields
    itemToUpdate.displayName = updateNode.displayName;
    itemToUpdate.description = updateNode.description;
    this.dataMap.next(mapCopy);
  }

  createNewDataItem(
    parentNode: DataItem,
    nodeName: string,
    nodeType: NodeType,
    compareExperimentList?: string[]
  ): DataItem {
    // TODO: this is a temporary fix for multiple calls of this method from addProteinDatabase
    let shouldAddNode = true;
    this.dataMap.value.getAllDisplayNames().forEach((name) => {
      if (name === nodeName) {
        shouldAddNode = false;
      }
    });
    if (shouldAddNode) {
      const newNodeObj: DataItem = {
        id: -1,
        parent: parentNode.id,
        children: [],
        depth: parentNode.depth + 1,
        type: nodeType,
        icon: undefined,
        displayName: nodeName,
        expanded: true,
        creationDate: this.getDate(),
        uuid: null,
        description: '',
      };
      // handle node-type specific data
      switch (nodeType) {
        case NodeType.Experiment:
          newNodeObj.icon = 'computer';
          this.createExperiment(newNodeObj);
          break;
        case NodeType.ProteinDB:
          newNodeObj.icon = 'storage';
          //newNodeObj.realUUID = realUUID;
          break;
        case NodeType.Folder:
          newNodeObj.icon = 'folder';
          break;
        case NodeType.PeakList:
          newNodeObj.icon = 'folder';
          break;
        case NodeType.SearchResult:
          newNodeObj.icon = 'folder';
          break;
        case NodeType.ExperimentComparison:
          newNodeObj.icon = 'poll';  // alternatives: layers , filter_none ?
          this.createComparison(newNodeObj, compareExperimentList);
      }
      // update the data map
      let mapCopy: DataItemMap = new DataItemMap();
      mapCopy.initializeAndReturnUser(this.dataMap.value.rootNode);
      mapCopy.addNewItemFromParent(newNodeObj, parentNode);
      // actual update that triggers a server call
      this.dataMap.next(mapCopy);
      // navigate to newly created node
      //this.navService.navigateOutlet(newNodeObj);
      return newNodeObj;
    } else {
      return null;
    }
  }

  getExperimentData(experimentID: string): Observable<ExperimentJSONObject> {
    var dbExperiment: ExperimentJSONObject = new ExperimentJSONObject();
    const params: HttpParams = new HttpParams(
      {
        fromObject: {
          jobid: experimentID,
        }
      }
    )
    return this.httpClientService.getObject<ExperimentJSONObject>(this.addressService.getEndpoint(Endpoints.GET_EXPERIMENT_DATA), params);
  }

  createExperiment(nodeObj) {
    // TODO: Set data from input
    const dbExperiment = new ExperimentJSONObject();
    dbExperiment.expid = nodeObj.uuid;
    dbExperiment.type = 'EXPERIMENT';
    dbExperiment.name = nodeObj.displayName;
    dbExperiment.description = nodeObj.description;
    dbExperiment.creationdate = nodeObj.creationDate;

    const params = new HttpParams(
      {
        fromObject: {
          jobid: nodeObj.uuid,
        }
      }
    )
    this.httpClientService
      .postObject<ExperimentJSONObject, ExperimentJSONObject>(
        dbExperiment,
        this.addressService.getEndpoint(Endpoints.CREATE_EXPERIMENT),
        params,
      )
      .subscribe((response) => {
        nodeObj.uuid = response.expid;
        nodeObj.description = response.description;
        nodeObj.displayName = response.name;
        nodeObj.creationDate = response.creationdate;
        this.updateNode(nodeObj);
      });
  }

  updateExperiment(nodeObj,experimentData) {
    // TODO: Set data from input
    const dbExperiment = new ExperimentJSONObject();
    dbExperiment.expid = nodeObj.uuid;
    dbExperiment.name = nodeObj.displayName;
    dbExperiment.description = nodeObj.description;
    dbExperiment.creationdate = nodeObj.creationDate;
    dbExperiment.targetFdr = experimentData.targetFdr;
    dbExperiment.isSearched = experimentData.isSearched;

    const params = new HttpParams(
      {
        fromObject: {
          jobid: nodeObj.uuid,
        }
      }
    )
    this.httpClientService
      .postObject<ExperimentJSONObject, ExperimentJSONObject>(
        dbExperiment,
        this.addressService.getEndpoint(Endpoints.UPDATE_EXPERIMENT_DATA),
        params,
      )
      .subscribe((response) => {
        nodeObj.uuid = response.expid;
        nodeObj.description = response.description;
        nodeObj.displayName = response.name;
        nodeObj.creationDate = response.creationdate;
        this.updateNode(nodeObj);
      });
  }

  getFastaData(fastaUUID) {
    const params: HttpParams = new HttpParams(
      {
        fromObject: {
          jobid: fastaUUID,
        }
      }
    )
    return this.httpClientService.getObject<ProtDBJSONObject>(this.addressService.getEndpoint(Endpoints.PROTEINLOADER_GET_PROTDBDATA), params)
  }

  updateFastaData(proteinDB: ProtDBJSONObject, nodeObj: DataItem) {
    const params = new HttpParams(
      {
        fromObject: {
          jobid: proteinDB.protdbId,
        }
      }
    )
    this.httpClientService.postObject<ProtDBJSONObject, ProtDBJSONObject>(
      proteinDB,
      this.addressService.getEndpoint(Endpoints.PROTEINLOADER_UPDATE_PROTDBDATA),
      params
    )
      .subscribe((response: ProtDBJSONObject) => {
        nodeObj.description = response.description;
        nodeObj.displayName = response.name;
        this.updateNode(nodeObj);
      })
  }

  removeDataItem(dataItem: DataItem) {
    let mapCopy: DataItemMap = new DataItemMap();
    mapCopy.initializeAndReturnUser(this.dataMap.value.rootNode);
    const allEffectedNodesNames = [];
    allEffectedNodesNames.push(dataItem.displayName);
    mapCopy.getAllChildren(dataItem).forEach((child) => {
      allEffectedNodesNames.push(child.displayName);
    });
    // error dialog
    const dialogRef = this.dialog.open(DeleteWarningDialogComponent, {
      disableClose: true,
      data: {
        dialogPrompt: 'Are you sure you want to delete:',
        nodeNames: allEffectedNodesNames,
      },
    });
    dialogRef.afterClosed().subscribe((event) => {
      if (event === 'delete') {
        // remove from dataMap
        const parentNode = mapCopy.removeItemReturnParent(dataItem);
        // update dataMap
        this.dataMap.next(mapCopy);
        // navigate to parent node
        this.navService.navigateOutlet(parentNode);
      }
    });
  }

  moveDataItem(dataItemToBeMoved: DataItem, movedToAfterDataItem: DataItem) {
    // TODO: from drag and drop
  }

  getExistingNodeNames(): string[] {
    return this.dataMap.value.getAllDisplayNames();
  }

  getDate(): string {
    let currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSecond = currentDate.getSeconds();
    const offset = currentDate.getTimezoneOffset();
    currentDate = new Date(currentDate.getTime() - offset * 60 * 1000);
    return `${currentDate.toISOString().split('T')[0]
      } ${currentHour}:${currentMinute}:${currentSecond}`;
  }

  getProteinDatabases(): DataItem[] {
    const protDBlist: DataItem[] = [];
    this.dataMap.value.getDataItemList().forEach((item) => {
      if (item.type === NodeType.ProteinDB) {
        protDBlist.push(item);
      }
    });
    return protDBlist;
  }

  getExperimentsMap() {
    const map = new Map;
    this.dataMap.value.getDataItemList().forEach((item) => {
      if (item.type === NodeType.Experiment) {
        map.set(item.displayName, item.uuid);
      }
    })
    return map;
  }

  createComparison(nodeObj: DataItem, experimentIDs: string[]) {

    const dbComparison = new ExperimentJSONObject();
    dbComparison.expid = nodeObj.uuid;
    dbComparison.type = 'COMPARISON';
    dbComparison.experiments = experimentIDs;
    dbComparison.name = nodeObj.displayName;
    dbComparison.description = nodeObj.description;
    dbComparison.creationdate = nodeObj.creationDate;

    this.httpClientService
      .postObject<ExperimentJSONObject, ExperimentJSONObject>(
        dbComparison,
        this.addressService.getEndpoint(Endpoints.CREATE_COMPARISON),
        new HttpParams(),
      )
      .subscribe((response) => {
        nodeObj.uuid = response.expid;
        nodeObj.description = response.description;
        nodeObj.displayName = response.name;
        nodeObj.creationDate = response.creationdate;
        this.updateNode(nodeObj);
      });
  }
}
