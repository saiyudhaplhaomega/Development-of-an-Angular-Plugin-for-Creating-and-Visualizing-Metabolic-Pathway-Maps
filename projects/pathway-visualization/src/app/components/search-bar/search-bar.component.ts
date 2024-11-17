import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NetworkManagerService } from '../../services/network-manager.service';
import { NetworkCanvasService } from '../../services/network-canvas.service';
import { NetworkMap, Node } from '../../models/network-elements.model';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'vis-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  nodesData: Node[] = [];
  suggestionsPaths: string[] = [];
  searchNodeId: number = -1;
  networkMap: NetworkMap | undefined;
  private searchNodeIdSubscription: Subscription;
  @Input() searchText: string = '';
  @Input() searchPlaceholder: string = 'Search by ID';
  @Input() suggestions: string[] = [];
  @Output() searchTextChangedEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<void>();
  @Output() suggestionClickEvent = new EventEmitter<string>();
  
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
        }
      });
    this.searchNodeIdSubscription = this.networkCanvasService.searchNodeId$.subscribe(id => {
      this.searchNodeId = id;
    });
  }
  ngOnDestroy() {
    if (this.searchNodeIdSubscription) {
      this.searchNodeIdSubscription.unsubscribe();
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
    this.searchTextChangedEvent.emit(text);
    this.suggestions = this.nodesData
      .map(node => node.label)
      .filter(nodeId => nodeId.includes(text))
      .slice(0, 5);  // Limit to 5 suggestions for simplicity
  }
  onSearchTextChangedPaths(text: string) {
    this.suggestionsPaths = this.nodesData
      .map(node => node.label)
      .filter(nodeId => nodeId.includes(text))
      .slice(0, 5);  // Limit to 5 suggestions for simplicity
      
  }
  
  onSearch() {
    const targetNode = this.nodesData.find(node => node.label === this.searchText);
    if (targetNode) {
      this.networkCanvasService.searchNodeId = Number(targetNode.nodeId);
      const simulation = this.networkCanvasService.getSimulation(); // Get simulation from the service
      if (simulation) {
        console.log('Restarting simulation');
        simulation.alpha(0.01).restart();
      } else {
        console.error('Simulation is not initialized');
      }
      this.searchEvent.emit();
    } else {
      console.error('Target node not found');
    }
  }
  
  onSuggestionClick(suggestion: string) {
    this.searchText = suggestion;
    this.suggestions = [];  // Optionally clear the suggestions list
  
    if (suggestion.trim() === '') {
      this.networkCanvasService.searchNodeId = -1;
      const simulation = this.networkCanvasService.getSimulation(); // Get simulation from the service
      if (simulation) {
        console.log('Restarting simulation with searchNodeId set to -1');
        simulation.alpha(0.01).restart();
      } else {
        console.error('Simulation is not initialized');
      }
    } else {
      this.onSearch();  // Optionally trigger the search immediately
    }
  
    this.suggestionClickEvent.emit(suggestion);
  }

  /*
  onSearch() {
    const targetNode = this.nodesData.find(node => node.label === this.searchText);
    this.searchNodeId = Number(targetNode.nodeId);
    this.simulation.alpha(0.01).restart();
  }*/
  /*
  onSuggestionClickSrtPathFrom(suggestion: string) {
    this.shortagePathFromNode = suggestion;
    this.suggestions = [];  // Optionally clear the suggestions list
    console.log('from', this.shortagePathFromNode);
  }
  onSuggestionClickSrtPathTo(suggestion: string) {
    this.shortagePathToNode = suggestion;
    this.suggestionsPaths = [];  // Optionally clear the suggestions list

    this.shortestPath = this.findShortestPath(this.shortagePathFromNode, this.shortagePathToNode);
    this.simulation.alpha(0.01).restart();
  } */
}
