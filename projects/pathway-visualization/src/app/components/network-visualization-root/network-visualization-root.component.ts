import { Component, OnInit } from '@angular/core';
import { NetworkCanvasService } from '../../services/network-canvas.service';
import { Node } from '../../models/network-elements.model';
import { distinctUntilChanged } from 'rxjs';
import { NetworkManagerService } from '../../services/network-manager.service';

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
  panEnabled: boolean = false;
  brushEnabled: boolean = false;
  textBoxMode: boolean = false;
  
  constructor(private networkManagerService: NetworkManagerService,
    private networkCanvasService: NetworkCanvasService) {}

  ngOnInit() {
    this.activeToolName = this.networkManagerService.getActiveToolName();
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


  //toolbar functions ;;;;;;;;;;;;;;;;;;;;
  searchEnable() {
    this.activeToolName = 'search';
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

  zoomIn() {
    this.activeToolName = 'zoomIn';
    this.networkManagerService.setActiveToolName(this.activeToolName);
    // Implement zoom in logic
  }

  zoomOut() {
    this.activeToolName = 'zoomOut';
    this.networkManagerService.setActiveToolName(this.activeToolName);
    // Implement zoom out logic
  }

  enableToolTip() {
    this.activeToolName = this.activeToolName == 'tooltip' ? 'search' : 'tooltip';
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

  panGraph() {
    this.activeToolName = this.activeToolName == 'panEnable' ? 'search' : 'panEnable';
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

  selectNode() {
    this.activeToolName = this.activeToolName == 'selectNode' ? 'search' : 'selectNode';
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

  refreshGraph() {
    this.activeToolName = 'search';
    this.networkManagerService.setActiveToolName(this.activeToolName);
    // Implement refresh graph logic
  }

  toggleCallbackMode(mode) {
    this.activeToolName = this.activeToolName == mode ? 'search' : mode;
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

  snapMode() {
    this.activeToolName = this.activeToolName == 'snapMode' ? 'search' : 'snapMode';
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

  orthogonalMode() {
    this.activeToolName = this.activeToolName == 'orthogonalMode' ? 'search' : 'orthogonalMode';
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

  shortagePathEnabled() {
    this.activeToolName = this.activeToolName == 'shortagePath' ? 'search' : 'shortagePath';
    this.networkManagerService.setActiveToolName(this.activeToolName);
    // Implement shortage path logic
  }

  arrowAnimation() {
    this.activeToolName = this.activeToolName == 'arrowAnimation' ? 'search' : 'arrowAnimation';
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

  dynamic() {
    this.activeToolName = this.activeToolName == 'dynamic' ? 'search' : 'dynamic';
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

  toggleTextBoxMode() {
    this.activeToolName = this.activeToolName == 'textBoxMode' ? 'search' : 'textBoxMode';
    this.networkManagerService.setActiveToolName(this.activeToolName);
  }

}
