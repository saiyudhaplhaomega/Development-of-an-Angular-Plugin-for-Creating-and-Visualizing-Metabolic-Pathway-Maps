import { Component, OnInit } from '@angular/core';
import { NetworkCanvasService } from '../../services/network-canvas.service';
import { Edge, Node } from '../../models/network-elements.model';
import { distinctUntilChanged, Subscription } from 'rxjs';
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
  }
  onSearchTextChanged(text: string) {
    this.searchText = text;
    this.suggestions = this.nodesData
      .map(node => node.label)
      .filter(nodeId => nodeId.includes(text))
      .slice(0, 5);  // Limit to 5 suggestions for simplicity
  }

  onSearch() {
    console.log('onSearch triggered in NetworkVisualizationRootComponent');
    const targetNode = this.nodesData.find(node => node.label === this.searchText);
    if (targetNode) {
      this.networkCanvasService.searchNodeId = Number(targetNode.nodeId);
      const simulation = this.networkCanvasService.getSimulation(); // Get simulation from the service
      if (simulation) {
        console.log('Restarting simulation on net-vis-root for searchNodeId ',this.searchNodeId);
        simulation.alpha(0.01).restart();
      } else {
        console.error('Simulation is not initialized');
      }
    } else {
      console.error('Target node not found');
    }
  }

  onSuggestionClick(suggestion: string) {
    this.searchText = suggestion;
    this.suggestions = [];  // Optionally clear the suggestions list
    this.onSearch();  // Optionally trigger the search immediately
  }


  //toolbar functions ;;;;;;;;;;;;;;;;;;;;
  searchEnable() {
    this.networkCanvasService.activeToolName = 'search';
  }

  zoomIn() {
    this.networkCanvasService.activeToolName = 'zoomIn';
    this.activeToolName = 'zoomIn'
    this.zoomScale *= 1.1;
    if(this.zoomScale > 1.5) {
      this.roundingEnabled = true;
    } else {
      this.roundingEnabled = false;
    }
    this.networkCanvasService.getSimulation().alpha(0.3).restart();
    // Implement zoom in logic
  }

  zoomOut() {
    this.networkCanvasService.activeToolName = 'zoomOut';
    // Implement zoom out logic
    this.zoomScale /= 1.1;
    if(this.zoomScale < 1.5) {
      this.roundingEnabled = false;
    } else {
      this.roundingEnabled = true;
    }
    this.networkCanvasService.getSimulation().alpha(0.3).restart();
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
    this.networkCanvasService.activeToolName = 'search';
    // Implement refresh graph logic
  }

  toggleCallbackMode(mode) {
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
 /*
  arrowAnimation() {
    const gridSpacing = 50;
    this.activeToolName = this.activeToolName == 'arrowAnimation' ? 'search' : 'arrowAnimation';
    this.networkManagerService.setActiveToolName(this.activeToolName);
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');

    let currentEdgeIndex = 0; // Track the current edge being animated
    const totalEdges = this.edgesData.length;

    const animateArrow = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        this.drawGrid();
        this.drawLinks(gridSpacing);
        this.drawNodes(this.nodesData, gridSpacing);

        if (currentEdgeIndex < totalEdges) {
            const edge = this.edgesData[currentEdgeIndex];
            const sourceNode = this.nodesData.find(node => node.nodeId === edge.source.nodeId);
            const targetNode = this.nodesData.find(node => node.nodeId === edge.target.nodeId);

            if (sourceNode && targetNode) {
                // Update progress for the current edge
                edge.animationProgress = edge.animationProgress || 0;

                // Calculate the current position of the arrow
                const startX = sourceNode.x * this.zoomScale;
                const startY = sourceNode.y * this.zoomScale;
                const endX = targetNode.x * this.zoomScale;
                const endY = targetNode.y * this.zoomScale;

                const interpolatedX = startX * (1 - edge.animationProgress) + endX * edge.animationProgress;
                const interpolatedY = startY * (1 - edge.animationProgress) + endY * edge.animationProgress;

                // Draw the arrow at the interpolated position
                this.drawArrow(ctx, { x: startX, y: startY }, { x: interpolatedX, y: interpolatedY });

                // Update animation progress
                edge.animationProgress += 0.005; // Adjust speed here

                // Check if the arrow has reached the end
                if (edge.animationProgress >= 1) {
                    edge.animationProgress = 0; // Reset for the next arrow
                    currentEdgeIndex++; // Move to the next edge
                }
            }
        } else {
            currentEdgeIndex = 0; // Reset to the first edge
        }

        if(this.activeToolName === 'arrowAnimation') requestAnimationFrame(animateArrow); // Continue the animation
    };

    // Start the animation
    requestAnimationFrame(animateArrow);
  }
 */
  dynamic() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'dynamic' ? 'search' : 'dynamic';
  }

  toggleTextBoxMode() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'textBoxMode' ? 'search' : 'textBoxMode';
  }

}
