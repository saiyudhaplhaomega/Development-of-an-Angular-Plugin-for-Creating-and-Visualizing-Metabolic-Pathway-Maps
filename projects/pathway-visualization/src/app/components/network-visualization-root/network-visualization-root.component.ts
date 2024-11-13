import { Component, OnInit } from '@angular/core';
import { NetworkCanvasService } from '../../services/network-canvas.service';
import { Node } from '../../models/network-elements.model';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'vis-network-visualization-root',
  templateUrl: './network-visualization-root.component.html',
  styleUrls: ['./network-visualization-root.component.scss']
})
export class NetworkVisualizationRootComponent implements OnInit {
  activeToolName: string = 'search';
  searchText: string = '';
  suggestions: string[] = [];
  nodesData: Node[] = [];
  searchNodeId: number = -1;

  constructor(private networkCanvasService: NetworkCanvasService) {}

  ngOnInit() {
    this.networkCanvasService.networkMap$
      .pipe(distinctUntilChanged())
      .subscribe(networkMap => {
        if (networkMap) {
          this.nodesData = networkMap.nodes;
        }
      });
  }

  onSearchTextChanged(text: string) {
    this.searchText = text;
    this.suggestions = this.nodesData
      .map(node => node.label)
      .filter(nodeId => nodeId.includes(text))
      .slice(0, 5);  // Limit to 5 suggestions for simplicity
  }

  onSearch() {
    const targetNode = this.nodesData.find(node => node.label === this.searchText);
    if (targetNode) {
      this.searchNodeId = Number(targetNode.nodeId);
      const simulation = this.networkCanvasService.getSimulation(); // Get simulation from the service storing the state of simulation
      simulation.alpha(0.01).restart();
    }
  }

  onSuggestionClick(suggestion: string) {
    this.searchText = suggestion;
    this.suggestions = [];  // Optionally clear the suggestions list
    this.onSearch();  // Optionally trigger the search immediately
  }
}
