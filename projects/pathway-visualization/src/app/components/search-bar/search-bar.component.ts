import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NetworkCanvasService } from '../../services/network-canvas.service';
import { Edge, NetworkMap, Node } from '../../models/network-elements.model';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'vis-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  nodesData: Node[] = [];
  edgesData: Edge[] = [];
  suggestionsPaths: string[] = [];
  shortagePathFromNode = '';
  private shortagePathFromNodestore: string = '';
  shortagePathToNode = '';
  shortestPath: any[] = [];
  searchNodeId: number = -1;
  networkMap: NetworkMap | undefined;
  private searchNodeIdSubscription: Subscription;
  private shortestPathSubscription: Subscription;

  @Input() searchText: string = '';
  @Input() searchPlaceholder: string = 'Search by ID';
  @Input() suggestions: string[] = [];
  @Input() activeToolName: string;
  @Output() searchTextChangedEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<void>();
  @Output() suggestionClickEvent = new EventEmitter<string>();
  @Output() suggestionClickSrtPathFromEvent = new EventEmitter<string>();
  @Output() suggestionClickSrtPathToEvent = new EventEmitter<string>();
  @Output() searchTextChangedPathsEvent = new EventEmitter<string>();
  
  ///////////
  
  ///////////////
  constructor(

    private networkCanvasService: NetworkCanvasService, // Inject the service
    
  ) { }
  ngOnInit() {
    this.networkCanvasService.networkMap$
      .pipe(distinctUntilChanged())
      .subscribe(networkMap => {
        //console.log('Received networkMap in SearchBarComponent', networkMap);
        this.networkMap = networkMap;
        if (this.networkMap) {
          this.nodesData = this.networkMap.nodes;
          this.edgesData = this.networkMap.edges;
        }
      });
    this.searchNodeIdSubscription = this.networkCanvasService.searchNodeId$.subscribe(id => {
      this.searchNodeId = id;
    });
    this.shortestPathSubscription = this.networkCanvasService.shortestPath$.subscribe(path => {
      this.shortestPath = path;
    });
  }
  ngOnDestroy() {
    if (this.searchNodeIdSubscription) {
      this.searchNodeIdSubscription.unsubscribe();
    }
    if (this.shortestPathSubscription) {
      this.shortestPathSubscription.unsubscribe();
    }
  }
  /*
  onSearchTextChanged(text: string) {
    this.searchTextChangedEvent.emit(text);
  }

  onSuggestionClick(suggestion: string) {
    this.suggestionClickEvent.emit(suggestion);
  }

  onSearch() {
    this.searchEvent.emit();
  }
  */
  onSearchTextChanged(text: string) {
    //console.log('Search text changed:', text);
    this.searchTextChangedEvent.emit(text);
  /*  this.suggestions = this.nodesData
      .map(node => node.label)
      .filter(nodeId => nodeId.includes(text))
      .slice(0, 5);  // Limit to 5 suggestions for simplicity
  */
  }
  onSearchTextChangedPaths(text: string) {
    //console.log('Search text changed for paths:', text);
    /*
    this.suggestionsPaths = this.nodesData
      .map(node => node.label)
      .filter(nodeId => nodeId.includes(text))
      .slice(0, 5);  // Limit to 5 suggestions for simplicity
      */
  this.searchTextChangedPathsEvent.emit(text);
  }
  
  onSearch() {
    //console.log('Search triggered');
    this.searchEvent.emit();
  }
  
  onSuggestionClick(suggestion: string) {
    //console.log('Suggestion clicked :', suggestion);
    //this.searchText = suggestion;
    //this.suggestions = [];  // Optionally clear the suggestions list
    /*
    if (suggestion.trim() === '') {
      this.networkCanvasService.searchNodeId = -1;
      const simulation = this.networkCanvasService.getSimulation(); // Get simulation from the service
      if (simulation) {
        console.log('Restarting simulation with searchNodeId set to -1');
        //simulation.alpha(0.01).restart();
      } else {
        console.error('Simulation is not initialized');
      }
    } else {
      //this.onSearch();  // Optionally trigger the search immediately
    }
    */
    this.suggestionClickEvent.emit(suggestion);
  }
  
  
  
  onSuggestionClickSrtPathFrom(suggestion: string) {
    //console.log('Suggestion clicked for shortage path from:', suggestion);
    //this.shortagePathFromNode = suggestion;
    //this.shortagePathFromNodestore =this.shortagePathFromNode;
    
    //this.suggestions = [];  // Optionally clear the suggestions list
    this.suggestionClickSrtPathFromEvent.emit(suggestion);
  }
  
  onSuggestionClickSrtPathTo(suggestion: string) {
    //console.log('Suggestion clicked for shortage path to:', suggestion);
    //this.shortagePathToNode = suggestion;
    //console.log('shortagePathFromNode set to:', this.shortagePathFromNodestore);
    //console.log('shortagePathToNode set to:', this.shortagePathToNode);
    //this.suggestions = [];  // Optionally clear the suggestions list
    this.suggestionClickSrtPathToEvent.emit(suggestion);
  }
 /*
  findShortestPath(sourceNodeId: string, targetNodeId: string): any[] {
    //console.log('Finding shortest path from ', sourceNodeId, 'to', targetNodeId);
    //const sourceNode = this.nodesData.find(node => node.label === sourceNodeId);
    //const targetNode = this.nodesData.find(node => node.label === targetNodeId);
  
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
        if (edge.source === currentNodeId) {
          const neighborId = edge.target;
          const distanceToNeighbor = distances[currentNodeId] + 1; // Assuming unweighted edges
  
          if (distanceToNeighbor < distances[neighborId]) {
            distances[neighborId] = distanceToNeighbor;
            previous[neighborId] = currentNodeId;
            queue.push(neighborId);
          }
        } else if (edge.target === currentNodeId) {
          const neighborId = edge.source;
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
    return shortestPath;
  
  }*/
}
