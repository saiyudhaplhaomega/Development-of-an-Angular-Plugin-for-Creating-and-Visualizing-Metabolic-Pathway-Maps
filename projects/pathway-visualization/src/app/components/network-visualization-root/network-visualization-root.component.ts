import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NetworkCanvasService } from '../../services/network-canvas.service';
import { Edge, Node } from '../../models/network-elements.model';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { NetworkManagerService } from '../../services/network-manager.service';
import { NetworkCanvasComponent } from '../network-canvas/network-canvas.component';

@Component({
  selector: 'vis-network-visualization-root',
  templateUrl: './network-visualization-root.component.html',
  styleUrls: ['./network-visualization-root.component.scss']
})
export class NetworkVisualizationRootComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainerRef: ElementRef;
  @ViewChild(NetworkCanvasComponent) networkCanvasComponent: NetworkCanvasComponent;
  public activeToolName: string;
  searchText: string = '';
  suggestions: string[] = [];
  shortestPath: any[] = [];
  nodesData: Node[] = [];
  edgesData: Edge[] = [];
  searchNodeId: number = -1;
  panEnabled: boolean = false;
  brushEnabled: boolean = false;
  textBoxMode: boolean = false;
  zoomScale: number = 1;
  public roundingEnabled: boolean = false;
  private previouslyHoveredNode: any = null;
  public orthogonalEnabled: boolean = false;
  private searchNodeIdSubscription: Subscription;
  private activeToolNameSubscription: Subscription;
  private canvasSubscription: Subscription;
  private ctxSubscription: Subscription;
  private shortestPathSubscription: Subscription;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  shortagePathFromNode: string = '';
  private shortagePathFromNodestore: string = '';
  shortagePathToNode: string = '';
  suggestionsPaths: string[] = [];

  constructor(private networkManagerService: NetworkManagerService,
    private networkCanvasService: NetworkCanvasService) {}

  ngOnInit() {
    this.networkCanvasService.networkMap$
      .pipe(distinctUntilChanged())
      .subscribe(networkMap => {
        if (networkMap) {
          this.nodesData = networkMap.nodes;
          this.edgesData = networkMap.edges;
        }
      });

      this.searchNodeIdSubscription = this.networkCanvasService.searchNodeId$.subscribe(id => {
        this.searchNodeId = id;
      });

      this.activeToolNameSubscription = this.networkCanvasService.activeToolName$.subscribe(toolName => {
        this.activeToolName = toolName;
      });
    
      this.networkCanvasService.activeToolName$.subscribe(toolName => {
        this.activeToolName = toolName;
      });
      
      this.canvasSubscription = this.networkCanvasService.canvas$.subscribe(canvas => {
        if (canvas) {
          this.canvas = canvas;
        }
      });
  
      this.ctxSubscription = this.networkCanvasService.ctx$.subscribe(ctx => {
        if (ctx) {
          this.ctx = ctx;
        }
      });
      this.shortestPathSubscription = this.networkCanvasService.shortestPath$.subscribe(path => {
        this.shortestPath = path;
      });
  }
  //need to unsubscribe from the subscriptions or not ?
  
  ngOnDestroy() {
    // Existing code...
  
    if (this.searchNodeIdSubscription) {
      this.searchNodeIdSubscription.unsubscribe();
    }
  
    if (this.activeToolNameSubscription) {
      this.activeToolNameSubscription.unsubscribe();
    }
    if (this.canvasSubscription) {
      this.canvasSubscription.unsubscribe();
    }

    if (this.ctxSubscription) {
      this.ctxSubscription.unsubscribe();
    }
    if (this.shortestPathSubscription) {
      this.shortestPathSubscription.unsubscribe();
    }
  }
  onSearchTextChanged(text: string) {
    console.log('Search text changed in root:', text);
    this.searchText = text;
    this.suggestions = this.nodesData
      .map(node => node.label)
      .filter(nodeId => nodeId.includes(text))
      .slice(0, 5);  // Limit to 5 suggestions for simplicity
  }

  onSearchTextChangedPaths(text: string) {
    console.log('Search text changed for paths in root:', text);
    this.suggestionsPaths = this.nodesData
      .map(node => node.label)
      .filter(nodeId => nodeId.includes(text))
      .slice(0, 5);  // Limit to 5 suggestions for simplicity
  }

  onSearch() {
    //console.log('Search triggered in root');
    //console.log('shortagePathFromNode in root:', this.shortagePathFromNode);
    //console.log('shortagePathToNode in root:', this.shortagePathToNode);
    console.log('press search for shortest path')
    if (this.activeToolName !== 'shortagePath') {
      // General search logic
      const targetNode = this.nodesData.find(node => node.label === this.searchText);
      if (targetNode) {
        this.networkCanvasService.searchNodeId = Number(targetNode.nodeId);
        const simulation = this.networkCanvasService.getSimulation(); // Get simulation from the service
        if (simulation) {
          simulation.alpha(0.01).restart();
        } else {
          console.error('Simulation is not initialized');
        }
      } else {
        console.error('Target node not found');
      }
    } else {
      // Shortage path logic
      //console.log('Shortage path from:', this.shortagePathFromNodestore, 'to:', this.shortagePathToNode);
      if (this.shortagePathFromNodestore && this.shortagePathToNode) {
        const fromNode = this.nodesData.find(node => node.label === this.shortagePathFromNodestore);
        const toNode = this.nodesData.find(node => node.label === this.shortagePathToNode);
        if (fromNode && toNode) {
          this.networkCanvasService.searchNodeId = Number(fromNode.nodeId);
          const simulation = this.networkCanvasService.getSimulation(); // Get simulation from the service
          if (simulation) {
            
            this.shortestPath = this.findShortestPath(this.shortagePathFromNodestore, this.shortagePathToNode);
            this.networkCanvasService.setShortestPath(this.findShortestPath(this.shortagePathFromNodestore, this.shortagePathToNode));
            simulation.alpha(0.01).restart();
          } else {
            console.error('Simulation is not initialized');
          }
          //this.shortestPath = this.findShortestPath(this.shortagePathFromNodestore, this.shortagePathToNode);
         

        } else {
          console.error('From or To node not found');
        }
      } else {
        console.error('Both From and To nodes must have values');
      }
    }
  }

  onSuggestionClick(suggestion: string) {
    //console.log('Suggestion clicked in root:', suggestion);
    this.searchText = suggestion;
    this.suggestions = [];  // Optionally clear the suggestions list
    //this.onSearch();  // Optionally trigger the search immediately
  }

  onSuggestionClickSrtPathFrom(suggestion: string) {
    //console.log('Suggestion clicked for shortage path from in root:', suggestion);
    this.shortagePathFromNode = suggestion;
    this.shortagePathFromNodestore =this.shortagePathFromNode;
    //console.log('shortagePathFromNode in root set to:', this.shortagePathFromNode);
    this.suggestions = [];  // Optionally clear the suggestions list
  }
  
  onSuggestionClickSrtPathTo(suggestion: string) {
    console.log('Suggestion clicked for shortage path to in root:', suggestion);
    this.shortagePathToNode = suggestion;
    //console.log('shortagePathToNode in root set to:', this.shortagePathToNode);
    //console.log('shortagePathFromNode in root set to:', this.shortagePathFromNodestore);
    this.suggestionsPaths = [];  // Optionally clear the suggestions list
    this.shortestPath = this.findShortestPath(this.shortagePathFromNode, this.shortagePathToNode);
  }
  
  findShortestPath(sourceNodeId: string, targetNodeId: string): any[] {
    // console.log('Finding shortest path in findShortestPath in root from ', sourceNodeId, 'to', targetNodeId);
    const sourceNode = this.nodesData.find(node => node.label === sourceNodeId);
    const targetNode = this.nodesData.find(node => node.label === targetNodeId);
    console.log('sourceNode:', this.nodesData.length);

    if (!sourceNode || !targetNode) {
      console.error("Source or target node not found!");
      return [];
    }
    
    // Initialize distances to all nodes as infinity, except the source node as 0
    const distances: { [key: string]: number } = {};
    this.nodesData.forEach(node => {
      distances[node.label] = node.label === sourceNodeId ? 0 : Infinity;
    });
    
    // Initialize previous nodes
    const previous: { [key: string]: string | null } = {};
   
    // Queue to keep track of nodes to visit
    const queue: string[] = [];
    queue.push(sourceNodeId);
    while (queue.length > 0) {
      // Extract node with the minimum distance from the queue
      const currentNodeId = queue.shift()!;
      const currentNode = this.nodesData.find(node => node.label === currentNodeId);

      if (!currentNode) continue;

      // Explore neighboring nodes
      this.edgesData.forEach(edge => {
        const sourceNode = typeof edge.source === 'string'
          ? this.nodesData.find(node => node.nodeId === edge.source) // Resolve string to Node
          : edge.source;

        const targetNode = typeof edge.target === 'string'
          ? this.nodesData.find(node => node.nodeId === edge.target)
          : edge.target;

        if (sourceNode.label === currentNodeId) {
          const neighborId = targetNode.label;
          const distanceToNeighbor = distances[currentNodeId] + 1; // Assuming unweighted edges

          if (distanceToNeighbor < distances[neighborId]) {
            distances[neighborId] = distanceToNeighbor;
            previous[neighborId] = currentNodeId;
            queue.push(neighborId);
          }
        } else if (targetNode.label === currentNodeId) {
          const neighborId = sourceNode.label;
          const distanceToNeighbor = distances[currentNodeId] + 1; // Assuming unweighted edges

          if (distanceToNeighbor < distances[neighborId]) {
            distances[neighborId] = distanceToNeighbor;
            previous[neighborId] = currentNodeId;
            queue.push(neighborId);
          }
        }
      });
    }
    
    // Reconstruct shortest path from source to target
    const shortestPath: string[] = [];
    let currentNode = targetNodeId;
    
    while (currentNode !== sourceNodeId) {
      shortestPath.unshift(currentNode);
      currentNode = previous[currentNode]!;
    }
    shortestPath.unshift(sourceNodeId);
    console.log('Shortest path:', shortestPath);
    return shortestPath;
  }


  //toolbar functions ;;;;;;;;;;;;;;;;;;;;
  searchEnable() {
    this.networkCanvasService.activeToolName = 'search';
  }

  handleZoomInEvent() {
    if (this.networkCanvasComponent && typeof this.networkCanvasComponent.zoomIn === 'function') {
      this.networkCanvasComponent.zoomIn();
    } else {
      console.error('zoomIn method not found on network canvas component');
    }
  }

  handleZoomOutEvent() {
    if (this.networkCanvasComponent && typeof this.networkCanvasComponent.zoomOut === 'function') {
      this.networkCanvasComponent.zoomOut();
    } else {
      console.error('zoomOut method not found on network canvas component');
    }
  }
 
  enableToolTip() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'tooltip' ? 'search' : 'tooltip';
  }

  panGraph() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'panEnable' ? 'search' : 'panEnable';
  }

  selectNode() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'selectNode' ? 'search' : 'selectNode';
  }

  refreshGraph() {
    if (this.networkCanvasComponent && typeof this.networkCanvasComponent.refreshGraph === 'function') {
      this.networkCanvasComponent.refreshGraph();
    } else {
      console.error('refreshGraph method not found on network canvas component');
    }
  }

  toggleCallbackMode(mode: string) {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == mode ? 'search' : mode;
    this.previouslyHoveredNode = null;
  }

  snapMode() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'snapMode' ? 'search' : 'snapMode';
  }

  orthogonalMode() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'orthogonalMode' ? 'search' : 'orthogonalMode';
    this.orthogonalEnabled =  !this.orthogonalEnabled;
    if (this.networkCanvasService.getSimulation()) this.networkCanvasService.getSimulation().alpha(0.3).restart();
  }

  shortagePathEnabled() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'shortagePath' ? 'search' : 'shortagePath';
    if (this.networkCanvasService.getSimulation()) this.networkCanvasService.getSimulation().alpha(0.3).restart();
    // Implement shortage path logic
  }
 
  //By emitting an event from toolbar.component.ts and handling it in network-visualization-root.component.ts, you can call the arrowAnimation method in network-canvas.component.ts. 
  //This approach allows you to trigger the arrowAnimation method from the toolbar and handle it in the root component.
  handleArrowAnimationEvent() {
    //console.log('handleArrowAnimationEvent called');
    if (this.networkCanvasComponent && typeof this.networkCanvasComponent.arrowAnimation === 'function') {
      this.networkCanvasComponent.arrowAnimation();
    } else {
      console.error('arrowAnimation method not found on canvas component');
    }
  }
  handleDynamicEvent() {
    if (this.networkCanvasComponent && typeof this.networkCanvasComponent.dynamic === 'function') {
      this.networkCanvasComponent.dynamic();
    } else {
      console.error('dynamic method not found on network canvas component');
    }
  }

  toggleTextBoxMode() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'textBoxMode' ? 'search' : 'textBoxMode';
  }

}
