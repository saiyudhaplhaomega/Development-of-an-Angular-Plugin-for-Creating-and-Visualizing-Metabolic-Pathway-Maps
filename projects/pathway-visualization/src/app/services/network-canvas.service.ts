import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration.model';
import { NetworkMap, Node, Edge, Level } from '../models/network-elements.model';
import { EdgeData, NetworkData, NodeData } from '../models/network-data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkCanvasService {
  private _dataSubject = new BehaviorSubject<NetworkData | undefined>(undefined);
  private _mapSubject = new BehaviorSubject<NetworkMap | undefined>(undefined);
  private _configSubject = new BehaviorSubject<Configuration | undefined>(undefined);

  public networkData$ = this._dataSubject.asObservable();
  public networkMap$ = this._mapSubject.asObservable();
  public config$ = this._configSubject.asObservable();
  constructor() { }

  // TODO: Implement a method that sets the network map and network data ,a setter for configuration too. 
  
  // Getter and Setter for _data
  public get networkData(): NetworkData | undefined {
    return this._dataSubject.value;
  }

  public set networkData(value: NetworkData | undefined) {
    //console.log('Updating networkData in NetworkCanvasService', value);
    this._dataSubject.next(value);
  }

  // Getter and Setter for _map
  // Getter and Setter for _map
  public get networkMap(): NetworkMap | undefined {
    return this._mapSubject.value;
  }

  public set networkMap(value: NetworkMap | undefined) {
    //console.log('Updating networkMap in NetworkCanvasService', value);
    this._mapSubject.next(value);
  }

  // Getter and Setter for _config
  public get config(): Configuration | undefined {
    return this._configSubject.value;
  }

  public set config(value: Configuration | undefined) {
    this._configSubject.next(value);
  }

  // Getter and Setter for nodes,NetworkMap
  public get nodes(): Node[] {
    return this._mapSubject.value?.nodes || [];
  }

  public set nodes(value: Node[]) {
    if (this._mapSubject.value) {
      this._mapSubject.value.nodes = value;
      this._mapSubject.next(this._mapSubject.value);
    }
  }

  // Getter and Setter for edges
  public get edges(): Edge[] {
    return this._mapSubject.value?.edges || [];
  }

  public set edges(value: Edge[]) {
    if (this._mapSubject.value) {
      this._mapSubject.value.edges = value;
      this._mapSubject.next(this._mapSubject.value);
    }
  }
///////////////////////////////////////////////
  // Getter for dataMap
  // Setter for dataMap
  // Getter and Setter for NodeData
  public get nodeData(): NodeData | undefined {
    return this._dataSubject.value?.nodeData;
  }

  public set nodeData(value: NodeData | undefined) {
    if (this._dataSubject.value) {
      this._dataSubject.value.nodeData = value;
      this._dataSubject.next(this._dataSubject.value);
    }
  }

  // Getter and Setter for EdgeData
  public get edgeData(): EdgeData | undefined {
    return this._dataSubject.value?.edgeData;
  }

  public set edgeData(value: EdgeData | undefined) {
    if (this._dataSubject.value) {
      this._dataSubject.value.edgeData = value;
      this._dataSubject.next(this._dataSubject.value);
    }
  }

  // Getter and Setter for level
  public get level(): Level | undefined {
    return this._dataSubject.value?.level;
  }

  public set level(value: Level | undefined) {
    if (this._dataSubject.value) {
      this._dataSubject.value.level = value;
      this._dataSubject.next(this._dataSubject.value);
    }
  }
}

