import { DataItemMap } from './../../../../mpa/src/app/modules/mpa/model/data-item-map';
import { Callbacks, LevelCallbacks, ModeCallbacks, NetworkInteractionEvent } from './../models/configuration.model';
import { Injectable } from '@angular/core';
import { NetworkCanvasService } from './network-canvas.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Node, Edge, Level, NetworkMap, NodeType, EdgeType } from '../models/network-elements.model';
import { Configuration } from '../models/configuration.model';
import { EdgeData, NetworkData, NodeData } from '../models/network-data.model';
import { mapTo, mergeMap } from 'rxjs/operators';

//Molecular Callbacks
const MolecularExplorationCallback : Callbacks= {
  hover: (event: NetworkInteractionEvent) => {console.log('this is hover event', event);} ,
  click: (event: NetworkInteractionEvent) => {console.log('this is click event', event);} ,
  doubleclick: (event: NetworkInteractionEvent) => {console.log('this is doubleclick event', event);} ,
  rightclick: (event: NetworkInteractionEvent) => {console.log('this is rightclick event', event);} ,
  }

  const MolecularEditingCallback : Callbacks= {
    hover: (event: NetworkInteractionEvent) => {console.log('this is hover event', event);} ,
    click: (event: NetworkInteractionEvent) => {console.log('this is click event', event);} ,
    doubleclick: (event: NetworkInteractionEvent) => {console.log('this is doubleclick event', event);} ,
    rightclick: (event: NetworkInteractionEvent) => {console.log('this is rightclick event', event);} ,
    }

const molecularModeCallback :ModeCallbacks = {
  exploration: MolecularExplorationCallback,
  editing: MolecularEditingCallback,
}

//Modular Callbacks
const modularExplorationCallback : Callbacks= {
  hover: (event: NetworkInteractionEvent) => {console.log('this is hover event', event);} ,
  click: (event: NetworkInteractionEvent) => {console.log('this is click event', event);} ,
  doubleclick: (event: NetworkInteractionEvent) => {console.log('this is doubleclick event', event);} ,
  rightclick: (event: NetworkInteractionEvent) => {console.log('this is rightclick event', event);} ,
  }

  const modularEditingCallback : Callbacks= {
    hover: (event: NetworkInteractionEvent) => {console.log('this is hover event', event);} ,
    click: (event: NetworkInteractionEvent) => {console.log('this is click event', event);} ,
    doubleclick: (event: NetworkInteractionEvent) => {console.log('this is doubleclick event', event);} ,
    rightclick: (event: NetworkInteractionEvent) => {console.log('this is rightclick event', event);} ,
    }


const modularModeCallback :ModeCallbacks = {
  exploration: modularExplorationCallback,
  editing: modularEditingCallback,
}

//Organelle Callbacks
const organelleExplorationCallback : Callbacks= {
  hover: (event: NetworkInteractionEvent) => {console.log('this is hover event', event);} ,
  click: (event: NetworkInteractionEvent) => {console.log('this is click event', event);} ,
  doubleclick: (event: NetworkInteractionEvent) => {console.log('this is doubleclick event', event);} ,
  rightclick: (event: NetworkInteractionEvent) => {console.log('this is rightclick event', event);} ,
  }

  const organelleEditingCallback : Callbacks= {
    hover: (event: NetworkInteractionEvent) => {console.log('this is hover event', event);} ,
    click: (event: NetworkInteractionEvent) => {console.log('this is click event', event);} ,
    doubleclick: (event: NetworkInteractionEvent) => {console.log('this is doubleclick event', event);} ,
    rightclick: (event: NetworkInteractionEvent) => {console.log('this is rightclick event', event);} ,
    }


const organelleModeCallback :ModeCallbacks = {
  exploration: organelleExplorationCallback,
  editing: organelleEditingCallback,
}

const levelCallbacks : LevelCallbacks = {
  //community: ModeCallbacks,
	organelle: organelleModeCallback,
	module: modularModeCallback ,
	molecular: molecularModeCallback

}

const networkConfig :Configuration = {
    updateLayoutFrequency: 1,
    showGrid: true,
    callbacks: levelCallbacks,
    colorscale: ['red', 'green', 'yellow'],
    minNodeSize: 1,
    maxNodeSize: 2,
};



@Injectable({
  providedIn: 'root'
})
export class NetworkManagerService {
  //TODO : for a method that fetches a network json from dummy script and call setter from  network canvas service and then set the netowrk in the map it
  //load it and parse it here in the network-manager service to node and edge objects json object, set it in Canvas.
  //projects\ofs\src\app\modules\workflow\services\workflow.service.ts
  private molecularPath = 'assets/molecular/';
  private defaultFile = '4928d7ae-b6a6-4997-a995-e11fcf13276cnetwork_n_9_e_14_l_molecular.json';
  private molecularFilesUrl = 'assets/molecular-files.json';
  private nodeAdditionalDataMap = new Map<string, any>();
  private edgeAdditionalDataMap = new Map<string, any>();
  selectedFile: string | null = null; //A variable to store the name of the file that the user selects.

  constructor(
    private http: HttpClient, 
    private networkService: NetworkCanvasService,) {
    this.initNetworkManager();
  }

  //method for calling the configuration set to initial loading
  initNetworkManager(): void {
   this.networkService.config = networkConfig;
   this.parseNetworkMap().subscribe(() => {
    // Data is loaded and set in networkCanvasService
    //console.log('Network map parsed and data set in networkCanvasService');
  });;
  }

  parseNetworkMap(): Observable<void> {
    return this.fetchFirstNetworkFile(this.defaultFile).pipe(
      switchMap(content => {
        this.networkService.nodes = content.nodes;
        this.networkService.edges = content.edges;
  
        return this.handleFileSelection(this.defaultFile).pipe(
          tap(() => {
            // Additional processing if needed
          }),
          mapTo(void 0) // Ensures the observable emits void
        );
      }),
      catchError(error => {
        console.error(error.message);
        return of(void 0); // Ensures the observable emits void in case of error
      })
    );
  }
  /*
  parseNetworkMap(): void {

    this.fetchFirstNetworkFile(this.defaultFile).subscribe(
      content => {
        //console.log('First File Content:', content);
        
        this.handleFileSelection(this.defaultFile).subscribe(
          (content) => {
            //console.log('parse 2nd File Content:', content.DataItemMap);
          }
        );
        
        //console.log('First File Content parseNetwork:', content);
        this.networkService.nodes = content.nodes;
        this.networkService.edges = content.edges;
        // Map nodes in the first file
        


        
        ////////////////////////////////////////////
        content.nodes.forEach((node: any) => {
              //console.log('Node   ',node);
              
                node.isSecondaryMetabolite = node.isSecondaryMetabolite || false;
                //node.type = this.matchNodeType(nodeData.type) || node.type;
                node.nodeType = node.type ? this.matchNodeType(node.type) : node.nodeType;
                node.color = node.color || 0;
                node.size = node.color || 0;
            });

            // Map edges in the first file
            content.edges.forEach((edge: Edge) => {
              const edgeData = this.edgeAdditionalDataMap.get(edge.dataRef);
              if (edgeData) {
                //edge.dataRef = edgeData.dataRef || edge.dataRef;
                edge.edgeType = edgeData.type ? this.matchEdgeType(edgeData.edgeType) : edge.edgeType;
                //edge.type = this.matchEdgeType(edgeData.type) || edge.type;
                edge.width = edge.color || 0;
                edge.color= edge.color || 0;
              }
            });
            
            
            const networkMap: NetworkMap = {
              nodes: content.nodes,
              edges: content.edges,
              level: this.extractLevel(content.level)
            };
            console.log('First Network map:', networkMap);


            const mapId = this.extractMapId(this.defaultFile);
            const level = this.extractLevel(content.level);
            this.fetchSecondFile(mapId, level).subscribe({
              next: (secondFileContent) => {
                //console.log('Second File Content:', secondFileContent);
                this.mapDataRefs(content, secondFileContent);
                const dataMap: NetworkData = {
                  nodeData: secondFileContent.nodeData,
                  edgeData: secondFileContent.edgeData,
                  level: this.extractLevel(secondFileContent.level)
                };
                
                this.setDataMap(dataMap);
                console.log('Data Map fom inside parseNetwork:', dataMap);
              },
              error: (error) => {
                //console.error(error.message);
              },
              //complete: () => {
              //  console.log('Fetch second file completed');
              //}
            });
            //////////////////////////////////////////// 
      },
      error => {
        //console.error(error.message);
      },
      
    );
  }
  */
  fetchData(fileName: string): Observable<any> {
    //const url = `${this.molecularPath}${fileName}`; //This constructs the full URL to the molecular file by concatenating the base path and the file name.
    //console.log(`Fetching molecular file from URL: ${fileName}`);
    //This makes an HTTP GET request to the URL and returns an observable that emits the response.
    return this.http.get<any>(fileName)
  }

  //////////////////////////////////////////
  extractMapId(file: string): string {
    return file.split('network_n_')[0];
  }

  selectFile(file: string): Observable<any> {
    //const mapId = this.extractMapId(file);
    return this.fetchFirstNetworkFile(file);
  }

  handleFileSelection(file: string): Observable<void> {
    const mapId = this.extractMapId(file);
    return this.selectFile(file).pipe(
      switchMap(content => {
        this.setNodes(content.nodes);
        this.setEdges(content.edges);

        const level = this.extractLevel(content.level);
        return this.fetchSecondFile(mapId, level).pipe(
          tap(secondFileContent => {
            this.mapDataRefs(content, secondFileContent);
            const dataMap: NetworkData = {
              nodeData: secondFileContent.nodeData,
              edgeData: secondFileContent.edgeData,
              level: this.extractLevel(secondFileContent.level)
            };
            //this.setDataMap(dataMap);
            //console.log('Data Map from inside parseNetwork:', dataMap);
          })
        );
      }),
      catchError(error => {
        console.error(error.message);
        return throwError(error);
      })
    );
  }
  //////////////////////////////////////////




  //This method takes a file name as an argument and returns an observable that emits the content of the file.
  fetchFirstNetworkFile(fileName: string): Observable<any> {
    const url = `${this.molecularPath}${fileName}`; //This constructs the full URL to the molecular file by concatenating the base path and the file name.
    //console.log(`Fetching molecular file from URL: ${url}`);
    //This makes an HTTP GET request to the URL and returns an observable that emits the response.
    return this.http.get<any>(url).pipe(
      //tap(() => console.log(`Successfully fetched molecular file: ${fileName}`)),//This operator logs a success message to the console when the file is successfully fetched.
      catchError(error => {
        console.error(`Error fetching molecular file: ${fileName}`, error);
        return throwError(() => new Error(`Error fetching molecular file: ${fileName}`));
      })
    );
  }

  fetchSecondFile(mapId: string, level: string): Observable<any> {
    const url = `${this.molecularPath}${mapId}_data_${level}.json`;
    //console.log(`Fetching second file from URL: ${url}`);
    return this.http.get<any>(url).pipe(
      //tap(() => console.log(`Successfully fetched second file: ${mapId}_data_${level}.json`)),
      catchError(error => {
        console.error(`Error fetching second file: ${mapId}_data_${level}.json`, error);
        return throwError(() => new Error(`Error fetching second file: ${mapId}_data_${level}.json`));
      })
    );
  }

  searchMolecularFiles(): Observable<string[]> {
    //console.log(`Fetching molecular files from URL: ${this.molecularFilesUrl}`);
    return this.http.get<string[]>(this.molecularFilesUrl).pipe(
      //tap(files => console.log(`Found molecular files: ${files}`)),
      catchError(error => {
        console.error('Error fetching molecular files:', error);
        return throwError(() => new Error('Error fetching molecular files'));
      })
    );
  }

  mapDataRefs(firstFileContent: any, secondFileContent: any): void {
    this.nodeAdditionalDataMap.clear();
    this.edgeAdditionalDataMap.clear();
    
    // Populate nodeAdditionalDataMap and edgeAdditionalDataMap from secondFileContent
    Object.entries(secondFileContent.nodeData).forEach(([key, value]) => {
      this.nodeAdditionalDataMap.set(key, value);
    });

    Object.entries(secondFileContent.edgeData).forEach(([key, value]) => {
      this.edgeAdditionalDataMap.set(key, value);
    });
    // Map nodes in the 2nd file 
    

    // Map nodes in the first file
    firstFileContent.nodes.forEach((node: Node) => {
      //console.log('Node   ',node);

      const nodeData = this.nodeAdditionalDataMap.get(node.dataRef);
      if (nodeData) {
        //node.isSecondaryMetabolite = nodeData.isSecondaryMetabolite || false;
        //node.type = this.matchNodeType(nodeData.type) || node.type;
        node.nodeType = nodeData.type ? this.matchNodeType(nodeData.type) : node.nodeType;
        node.color = node.color || 0;
        node.size = node.size || 0;
      }
    });

    // Map edges in the first file
    firstFileContent.edges.forEach((edge: Edge) => {
      const edgeData = this.edgeAdditionalDataMap.get(edge.dataRef);
      if (edgeData) {
        //edge.dataRef = edgeData.dataRef || edge.dataRef;
        edge.edgeType = edgeData.type ? this.matchEdgeType(edgeData.edgeType) : edge.edgeType;
        //edge.type = this.matchEdgeType(edgeData.type) || edge.type;
        edge.width = edge.width || 0;
        edge.color= edge.color || 0;
      }
    });
    //Setting NETWORK MAP, NODES and EDGES
    const networkMap: NetworkMap = {
      nodes: firstFileContent.nodes,
      edges: firstFileContent.edges,
      level: this.extractLevel(firstFileContent.level)
    };
    
    this.setNetworkMap(networkMap);
    this.setNodes(firstFileContent.nodes);
    this.setEdges(firstFileContent.edges);
    
    //console.log('Mapped Node Data:', this.nodeAdditionalDataMap);
    //console.log('Mapped Edge Data:', this.edgeAdditionalDataMap);
    //console.log('Network Map:', networkMap);


    //Setting NODE and EDGE ADDITIONAL DATA in the Data Map
    const dataMap: NetworkData = {
      nodeData: secondFileContent.nodeData,
      edgeData: secondFileContent.edgeData,
      level: this.extractLevel(secondFileContent.level)
    };
    
    this.setDataMap(dataMap);
    this.setdataNodes(secondFileContent.nodeData);
    this.setdataEdges(secondFileContent.edgeData);
    
    //console.log('Mapped NodeData Data:', dataMap.nodeData);
    //console.log('Mapped EdgeData Data:',  dataMap.edgeData);
    //console.log('Data Map:', dataMap);
    
  }
  private matchNodeType(type: string): NodeType {
    switch (type) {
      case 'circle':
        return NodeType.CIRCLE;
      case 'square':
        return NodeType.SQUARE;
      case 'diamond':
        return NodeType.DIAMOND;
      default:
        throw new Error(`Unknown NodeType: ${type}`);
    }
  }

  private matchEdgeType(type: string): EdgeType {
    switch (type) {
      case 'forward':
        return EdgeType.FORWARD;
      case 'reversible':
        return EdgeType.REVERSIBLE;
      case 'undirected':
        return EdgeType.UNDIRECTED;
      default:
        throw new Error(`Unknown EdgeType: ${type}`);
    }
  }
  public extractLevel(level: string): Level {
    //console.log('Level:', level);
    switch (level.toLowerCase()) {
      case 'community':
        return Level.COMMUNITY;
      case 'organelle':
        return Level.ORGANELLE;
      case 'module':
        return Level.MODULE;
      case 'molecular':
        return Level.MOLECULAR;
      default:
        throw new Error(`Unknown level: ${level}`);
    }
  }
  //setting the networkMap
  private setNetworkMap(map: NetworkMap): void {
    this.networkService.networkMap = map;
  }
  private setNodes(nodes: Node[]): void {
    this.networkService.nodes = nodes;
  }
  private setEdges(edges: Edge[]): void {
    this.networkService.edges = edges;
  }
  //setting the dataMap
  private setDataMap(data: NetworkData): void {
    this.networkService.networkData = data;
  }
  private setdataNodes(nodes: NodeData): void {
    this.networkService.nodeData = nodes;
  }
  private setdataEdges(edges: EdgeData): void {
    this.networkService.edgeData = edges;
  }

  getNodeAdditionalData(dataRef: string): any {
    return this.nodeAdditionalDataMap.get(dataRef);
  }

  getEdgeAdditionalData(dataRef: string): any {
    return this.edgeAdditionalDataMap.get(dataRef);
  }
  getNetworkData(): NetworkData | undefined {
    return this.networkService.networkData;
  }
  
  getNetworkMap(): NetworkMap | undefined {
    return this.networkService.networkMap;
  }
  
}

function switchMap<T, R>(project: (value: T, index: number) => Observable<R>): (source: Observable<T>) => Observable<R> {
  return (source: Observable<T>) => source.pipe(mergeMap(project));
}

