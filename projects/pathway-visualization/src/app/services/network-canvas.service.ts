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
  private searchNodeIdSubject = new BehaviorSubject<number>(-1);
  private hirarchySubject = new BehaviorSubject<number>(0);
  private selectHirarchySubject = new BehaviorSubject<number>(0);
  private activeToolNameSubject = new BehaviorSubject<string>('search');
  private canvasSubject = new BehaviorSubject<HTMLCanvasElement | null>(null);
  private ctxSubject = new BehaviorSubject<CanvasRenderingContext2D | null>(null);
  private simulation: d3.Simulation<any, any>;
  private shortestPathSubject = new BehaviorSubject<string[]>([]);
  private hirarchyNodesSubject = new BehaviorSubject<string[]>([]);

  public networkData$ = this._dataSubject.asObservable();
  public networkMap$ = this._mapSubject.asObservable();
  public config$ = this._configSubject.asObservable();
  public searchNodeId$ = this.searchNodeIdSubject.asObservable();
  public hirarchyActiveIndex$ = this.hirarchySubject.asObservable();
  public selectHirarchy$ = this.selectHirarchySubject.asObservable();
  public activeToolName$ = this.activeToolNameSubject.asObservable(); 
  public canvas$ = this.canvasSubject.asObservable();
  public ctx$ = this.ctxSubject.asObservable();
  
  public shortestPath$ = this.shortestPathSubject.asObservable();
  public hirarchyNodes$ = this.hirarchyNodesSubject.asObservable();


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

  //simulation service from canvas.ts to other components 
  //such as search-bar.component.ts.
  setSimulation(simulation: d3.Simulation<any, any>) {
    this.simulation = simulation;
  }

  getSimulation(): d3.Simulation<any, any> {
    return this.simulation;
  }

  public get searchNodeId(): number {
    return this.searchNodeIdSubject.value;
  }
  
  public set searchNodeId(value: number) {
    this.searchNodeIdSubject.next(value);
  }
  
  public get activeToolName(): string {
    return this.activeToolNameSubject.value;
  }
  
  public set activeToolName(value: string) {
    console.log('active tools service');
    this.activeToolNameSubject.next(value);
  }
  // Getter and Setter for canvas
  public get canvas(): HTMLCanvasElement | null {
    return this.canvasSubject.value;
  }

  public set canvas(value: HTMLCanvasElement | null) {
    this.canvasSubject.next(value);
  }

  // Getter and Setter for ctx
  public get ctx(): CanvasRenderingContext2D | null {
    return this.ctxSubject.value;
  }

  public set ctx(value: CanvasRenderingContext2D | null) {
    this.ctxSubject.next(value);
  }

  // Getter and Setter for hirarchy
  public get hirarchyActiveIndex(): number | null {
    return this.hirarchySubject.value;
  }

  public set hirarchyActiveIndex(value: number | null) {
    this.hirarchySubject.next(value);
  }

  public get selectHirarchy(): number | null {
    return this.selectHirarchySubject.value;
  }

  public set selectHirarchy(value: number | null) {
    this.selectHirarchySubject.next(value);
  }

  setShortestPath(path: string[]) {
    this.shortestPathSubject.next(path);
  }

  getShortestPath() {
    return this.shortestPathSubject.getValue();
  }

  setHirarchyNodes(node: string, index?: number): void {
    const currentNodes = this.getHirarchyNodes(); // Existing hierarchy nodes
    const label = node.split('/')[0]; // Extract the first part of the new node string
    let updatedNodes;
  
    if (node === 'reset' && index !== undefined && index + 1 < currentNodes.length) {
      updatedNodes = Array.from(new Set(currentNodes.slice(0, index + 1)));
    } else {
      const existingIndex = currentNodes.findIndex(currentNode => currentNode.startsWith(label));
  
      if (existingIndex !== -1) {
        currentNodes[existingIndex] = node; // Replace matching node
      } else {
        currentNodes.push(node); // Add new node
      }
  
      updatedNodes = Array.from(new Set(currentNodes)); // Ensure uniqueness
    }
  
    this.hirarchyNodesSubject.next(updatedNodes); // Update hierarchy nodes
  }
  
  getHirarchyNodes() {
    return this.hirarchyNodesSubject.getValue();
  }
}

