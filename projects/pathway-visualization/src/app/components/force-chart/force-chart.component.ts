import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { SimulationService } from './simulation.service';


// Define the interface for a node
interface Node {
  nodeId: string;
  label: string;
  x: number;
  y: number;
  nodeType: 'circle' | 'diamond'; // Assuming node types are limited to circle and diamond
  color: string;
  level: string; // Assuming it represents the hierarchical level of the node
}

// Define the interface for nodesData
interface NodesData {
  nodes: Node[];
}

@Component({
  selector: 'app-force-chart',
  templateUrl: `./force-chart.component.html`,
  styleUrls: ['./force-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class MainComponent implements OnInit {
  height = window.innerHeight * 0.9;
  width = window.innerWidth * 0.82;
  hierarchy: string[] = ['MOLECULAR', 'MODULE', 'ORGANELLE']
 // hierarchy: string[] =  ['MOLECULAR', 'MODULE', 'ORGANELLE']
  brushX0 = 0;
  brushY0 = 0;
  brushX1 = 0;
  brushY1 = 0;
  ctx: CanvasRenderingContext2D;
  private simulation: any;
  private tooltip: any;
   private nodesData: any[] = [];  // holds the nodes data for easy access
  //private nodesData: NodesData = { nodes: [] };
  private edgesData: any[] = [];
  private shortestPath: any[] = [];
  private rowData: string = '';
  private nodes: any[] = [];
  searchText = '';
  shortagePathFromNode = '';
  shortagePathToNode = '';
  suggestionsPaths: string[] = [];
  searchNodeId: number = -1;
  suggestions: string[] = [];
  zoomScale: number = 1;
  private zoomBehaviour: any;
  public hirarchyActiveIndex: number = 0;
  public hirarchyNodes: any = [];
  public nodeLevel: string = 'molecular';
  public activeToolName: string = 'search';
  public fps: number = 0;
  public fpsEnabled: boolean = false;
  public brushEnabled: boolean = false;
  public panEnabled: boolean = false;
  public roundingEnabled: boolean = false;
  public orthogonalEnabled: boolean = false;
  private dragNode: boolean = false;
  private draggingNode: any = null;
  currentTransform: any = d3.zoomIdentity;
  private callbackMode: boolean = false;
  public textBoxMode: boolean = false;
  private canvas;
  private nodesWithinBrush: any = [];
  private previouslyHoveredNode: any = null;

  // get reference to the container of the canvas elements
  @ViewChild('container', { static: true }) canvasContainerRef: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() callbacks = new EventEmitter();
  @Input() configuration: any;
  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private http: HttpClient,
    private simulationService: SimulationService,
  ) {
   // this.hierarchy = this.configuration.hierarchy;
    this.tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }

  ngOnInit() {
    const mainCanvas = d3
      .select(this.canvasContainerRef.nativeElement)
      .append('canvas')
      .classed('main-canvas', true)
      .attr('width', this.width)
      .attr('height', this.height);
    this.canvas = mainCanvas.node();
    // get reference to the context of the canvas elements
    this.ctx = mainCanvas
      .node()
      .getContext('2d', { willReadFrequently: true });
  }

  createTextBoxAt(event: any) {
    const rect = this.canvas.getBoundingClientRect();
    const x = (event.sourceEvent.clientX - rect.left); // Removed zoom scale for simplicity
    const y = (event.sourceEvent.clientY - rect.top);

    // Create container for input and cross icon
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    container.style.width = '100px';
    container.style.display = 'inline-block';

    // Create input element
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-text-box';
    input.style.width = '100px';
    container.appendChild(input);

    // Create cross icon
    const cross = document.createElement('span');
    cross.innerHTML = '×'; // or use a close icon
    cross.className = 'close-icon';
    cross.style.position = 'absolute';
    cross.style.right = '-15px';
    cross.style.top = '-20px';
    cross.style.cursor = 'pointer';
    container.appendChild(cross);

    // Append container to the body
    document.body.appendChild(container);

    // Set focus on the input
    input.focus();

    // Event listener for removing the input when cross is clicked
    cross.addEventListener('click', () => {
      document.body.removeChild(container);
    });

    // Event listener for entering text
    input.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const inputValue = input.value;
        if (inputValue) {
          // Draw text on canvas
          this.ctx.font = '20px sans-serif';
          this.ctx.fillStyle = 'black';
          this.ctx.fillText(inputValue, x / this.zoomScale, (y / this.zoomScale) + 20); // Adjust y position based on font size

          // Remove the container with the input and cross icon
          document.body.removeChild(container);
        }
      }
    });
  }

  clearTextboxes() {
    const svg = d3.select(this.element.nativeElement).select('svg');
    svg.selectAll('foreignObject').remove();
  }

  toggleCallbackMode(mode) {
    this.activeToolName = this.activeToolName == mode ? 'search' : mode;
    this.previouslyHoveredNode = null;
  }

  snapMode() {
    this.activeToolName = this.activeToolName == 'snapMode' ? 'search' : 'snapMode';
  }
  toggleTextBoxMode() {
    this.activeToolName = this.activeToolName == 'textBoxMode' ? 'search' : 'textBoxMode';
  }

  searchEnable() {
    this.activeToolName = 'search';
  }
  enableToolTip() {
    this.activeToolName = this.activeToolName == 'tooltip' ? 'search' : 'tooltip';
  }
  zoomIn() {
    this.activeToolName = 'zoomIn'
    this.zoomScale *= 1.1;
    if(this.zoomScale > 1.5) {
      this.roundingEnabled = true;
    } else {
      this.roundingEnabled = false;
    }
    this.simulation.alpha(0.3).restart();
  }

  zoomOut() {
    this.activeToolName = 'zoomOut'
    this.zoomScale /= 1.1;
    if(this.zoomScale < 1.5) {
      this.roundingEnabled = false;
    } else {
      this.roundingEnabled = true;
    }
    this.simulation.alpha(0.3).restart();
  }
  applyZoom() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.width / this.zoomScale, this.height / this.zoomScale);

    // // Update the scale part of the transform
    this.ctx.scale(this.zoomScale, this.zoomScale);

    // // Clear the canvas and redraw with the updated scale
    this.tick(this.ctx, this.nodesData); // Assuming you have a tick function to redraw nodes and links

  }
  panGraph() {
    this.activeToolName = this.activeToolName == 'panEnable' ? 'search' : 'panEnable';
  }
  selectNode() {
    this.activeToolName = this.activeToolName == 'selectNode' ? 'search' : 'selectNode';
  }
  shortagePathEnabled() {
    this.activeToolName = this.activeToolName == 'shortagePath' ? 'search' : 'shortagePath';
    if (this.simulation) this.simulation.alpha(0.3).restart();
  }
  enableFBS() {
    this.fpsEnabled = !this.fpsEnabled;
  }
  dynamic(){
    this.activeToolName = this.activeToolName == 'dynamic' ? 'search' : 'dynamic';
    const gridSpacing = 50;

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
                this.drawDot(ctx, { x: startX, y: startY }, { x: interpolatedX, y: interpolatedY });

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

        if(this.activeToolName === 'dynamic') requestAnimationFrame(animateArrow); // Continue the animation
    };

    // Start the animation
    requestAnimationFrame(animateArrow);
  }
  drawDot(ctx: CanvasRenderingContext2D, source: any, target: any) {
    const {x: startX, y: startY} = source;
    const {x: endX, y: endY} = target;

    // Calculate the angle of the line (you can keep this if you want for future reference)
    let angle = Math.atan2(endY - startY, endX - startX);

    // Draw a dot at the current interpolated position (endX, endY)
    const dotRadius = 1.5; // You can adjust the size of the dot here

    ctx.save();
    // Set the color of the dot
    ctx.fillStyle = '#000'; // You can change the color as needed
    // Draw the dot (circle)
    ctx.beginPath();
    ctx.arc(endX, endY, dotRadius, 0, Math.PI * 2); // Draw a circle at the interpolated position
    ctx.fill();
    ctx.restore();
  }

  arrowAnimation() {
    const gridSpacing = 50;
    this.activeToolName = this.activeToolName === 'arrowAnimation' ? 'search' : 'arrowAnimation';

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
  
  drawLinks(gridSpacing) {
    const ctx = this.ctx;
    const fluxScale = d3.scaleLinear()
      .domain([-1000, 1000])
      .range([7, 14]);
    
    const colorScale = d3.scaleSequential()
      .domain([0, 1])  // Input range (0 to 1)
      .interpolator(d3.interpolateRainbow);  // Use rainbow color interpolation
    
    this.simulation.force("link").links().forEach(link => {
      // Snap the link source and target positions to the grid

    //  let startX = Math.round(link.source.x / gridSpacing) * gridSpacing * this.zoomScale;
    //  let startY = Math.round(link.source.y / gridSpacing) * gridSpacing * this.zoomScale;
    //  let endX = Math.round(link.target.x / gridSpacing) * gridSpacing * this.zoomScale;
    //  let endY = Math.round(link.target.y / gridSpacing) * gridSpacing * this.zoomScale;
     let startX = link.source.x * this.zoomScale;
     let startY = link.source.y * this.zoomScale;
     let endX = link.target.x * this.zoomScale;
     let endY = link.target.y * this.zoomScale;
     if(['zoomIn', 'zoomOut'].includes(this.activeToolName) && this.roundingEnabled) {
        startX = Math.round(link.source.x / gridSpacing) * gridSpacing * this.zoomScale;
        startY = Math.round(link.source.y / gridSpacing) * gridSpacing * this.zoomScale;
        endX = Math.round(link.target.x / gridSpacing) * gridSpacing * this.zoomScale;
        endY = Math.round(link.target.y / gridSpacing) * gridSpacing * this.zoomScale;
     }
     // Determine if the link is part of the shortest path
     const isInShortestPath = this.shortestPath.includes(link.source.label) && this.shortestPath.includes(link.target.label);

     // Set line color to red if it's part of the shortest path, otherwise use the default color
     //ctx.strokeStyle = isInShortestPath && this.activeToolName ==='shortagePath' ? 'red' : '#ccc';

     if(link.flux == 0) {
      ctx.setLineDash([]);
     } else {
      const fluxValue = fluxScale(link.flux);
      ctx.setLineDash([fluxValue, fluxValue]); 
     }
     ctx.lineWidth = link.width;
     ctx.strokeStyle = colorScale(link.color);
     if(isInShortestPath && this.activeToolName ==='shortagePath') {
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.strokeStyle = 'red'
     } 

     // Draw orthogonal edges if either source or target is organelle
     if (this.orthogonalEnabled) {
       ctx.beginPath();
       ctx.moveTo(startX, startY);
   
       
       // Draw horizontal and vertical line segments
       if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
           // Draw horizontal line first
           const midX = (startX + endX) / 2;
           
           ctx.lineTo(midX, startY);
           ctx.lineTo(midX, endY);
           // Draw final vertical or horizontal line segment
           ctx.lineTo(endX, endY);
           ctx.stroke();
   
           // Draw direction arrow
           this.drawDirectionArrow(ctx, { x: endX, y: endY }, { x: midX, y: endY });
       } else {
           // Draw vertical line first
           const midY = (startY + endY) / 2;
          
           ctx.lineTo(startX, midY);
           ctx.lineTo(endX, midY);
           // Draw final vertical or horizontal line segment
           ctx.lineTo(endX, endY);
           ctx.stroke();
   
           // Draw direction arrow
           this.drawDirectionArrow(ctx, { x: endX, y: endY }, { x: endX, y: midY });
       }
   
     } else {

       ctx.beginPath();
       ctx.moveTo(startX, startY);
       ctx.lineTo(endX, endY);
       ctx.stroke();

       // Initialize animation progress if undefined
       if (isNaN(link.animationProgress)) {
         link.animationProgress = 0;
       }
       if (link.animationProgress==1 && this.activeToolName == 'arrowAnimation') {
         link.animationProgress = 0.2;
       }
       // Calculate interpolated positions
       const interpolatedX = startX * (1 - link.animationProgress) + endX * link.animationProgress;
       const interpolatedY = startY * (1 - link.animationProgress) + endY * link.animationProgress;

       // Draw the arrow with grid-aligned positions
       if(this.activeToolName === 'dynamic')
          this.drawDot(ctx, { x: startX, y: startY }, { x: interpolatedX, y: interpolatedY });
       else  
          this.drawArrow(ctx, { x: startX, y: startY }, { x: interpolatedX, y: interpolatedY });

       // Update animation progress
       link.animationProgress += 0.01; // Adjust animation speed as needed

       // Check if animation has reached its target
       if (link.animationProgress >= 1) {
           link.animationProgress = 1; // Ensure progress doesn't exceed 1
       }
     }


   });
  }
  drawNodes(nodes, gridSpacing) {
    const ctx = this.ctx;
    // Create a color scale from 0 to 1, mapping to a rainbow color scheme
    // Create a color scale from 0 to 1, mapping to a rainbow color scheme
    const colorScale = d3.scaleSequential()
      .domain([0, 1])  // Input range (0 to 1)
      .interpolator(d3.interpolateRainbow);  // Use rainbow color interpolation
    
    const widthScale = d3.scaleLinear()
      .domain([0.1, 1])  // Input range (0.1 to 1)
      .range([7, 14]);   // Output range (7 to 14)
    
      
     // Redraw nodes
     nodes.forEach(node => {
      if(['zoomIn', 'zoomOut'].includes(this.activeToolName) && this.roundingEnabled) {
       // Apply grid snapping to node positions
        node.x = Math.round(node.x / gridSpacing) * gridSpacing;
        node.y = Math.round(node.y / gridSpacing) * gridSpacing;
      }
      ctx.beginPath();
      // Set the color based on node.color condition
      const nodeColor = colorScale(node.color) //node.color === 1 ? 'red' : 'black';
      const nodeSize = widthScale(node.width);
      
      this.ctx.fillStyle = nodeColor;
      if (node.nodeType === 'circle') {
        ctx.arc(node.x * this.zoomScale, node.y * this.zoomScale, nodeSize * this.zoomScale, 0, Math.PI * 2);
      } else if (node.nodeType === 'diamond') {
        // Draw diamond
        const halfSize = nodeSize * this.zoomScale; // Adjust size based on this.zoomScale
        ctx.moveTo(node.x * this.zoomScale, node.y * this.zoomScale - halfSize);
        ctx.lineTo(node.x * this.zoomScale + halfSize, node.y * this.zoomScale);
        ctx.lineTo(node.x * this.zoomScale, node.y * this.zoomScale + halfSize);
        ctx.lineTo(node.x * this.zoomScale - halfSize, node.y * this.zoomScale);
        ctx.closePath();
      }
      let fillStyle = node.color;
      if(this.activeToolName == 'selectNode' && this.isNodeInBrush(node)) fillStyle = '#FF5722';
      if (this.searchNodeId && this.searchNodeId === node.nodeId) fillStyle = '#FF5722';



      ctx.fillStyle = fillStyle;
      ctx.fill();

      // Draw border
      if ((this.searchNodeId >= 0 && this.searchNodeId === node.nodeId)) {
        ctx.beginPath();
        if (node.nodeType === 'circle') {
          ctx.arc(node.x * this.zoomScale, node.y * this.zoomScale, 7 * this.zoomScale + 2, 0, Math.PI * 2); // Increased radius for border
        } else if (node.nodeType === 'diamond') {
          const halfSize = (7 * this.zoomScale) + 1; // Increased size for border
          ctx.moveTo(node.x * this.zoomScale, node.y * this.zoomScale - halfSize);
          ctx.lineTo(node.x * this.zoomScale + halfSize, node.y * this.zoomScale);
          ctx.lineTo(node.x * this.zoomScale, node.y * this.zoomScale + halfSize);
          ctx.lineTo(node.x * this.zoomScale - halfSize, node.y * this.zoomScale);
          ctx.closePath();
        }
        ctx.strokeStyle = 'red'; // Border color
        ctx.lineWidth = 5;
        ctx.stroke(); // <-- Use stroke() to draw the border
      }

      // Draw node labels
      ctx.fillStyle = 'black';
      ctx.font = `${12 * this.zoomScale}px Arial`; // Adjust font size based on this.zoomScale
      ctx.fillText(node.nodeId, node.x * this.zoomScale - 10 * this.zoomScale, node.y * this.zoomScale - 10 * this.zoomScale);

      if (this.activeToolName == 'selectNode' && this.isNodeInBrush(node)) {
        this.nodesWithinBrush.push(node);
      }
    });
  }

  orthogonalMode() {
    //this.activeToolName = this.activeToolName == 'orthogonalMode' ? 'search' : 'orthogonalMode';
    this.orthogonalEnabled =  !this.orthogonalEnabled;
    if (this.simulation) this.simulation.alpha(0.3).restart();
  }
  refreshGraph() {
    this.closeTooltip()
    this.activeToolName == 'search';
    this.zoomScale = 1;
    d3.selectAll('.input-text-box').remove();
    if (this.nodesData.length) {
      this.nodesData = [];
      this.edgesData = [];
      this.rowData = '';
      this.nodes = [];
      this.hirarchyNodes = [];
      this.suggestionsPaths = [];
      this.shortagePathFromNode = '';
      this.shortagePathToNode = '';
      this.activeToolName = 'search';
      this.hirarchyActiveIndex = 0;
      this.drawCanvas({ edges: [], nodes: [] })
      //this.simulation.alpha(1).restart();
    }
    this.fileInput.nativeElement.value = '';
  }

  uploadFile() {
    this.fileInput.nativeElement.click();
  }

  onSearchTextChanged(text: string) {
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
  filterNodesByLabel(graph, level) {
    let nodes = graph.nodes.filter((node) => node.level == level);
    let nodesIds = nodes.map((node) => node.nodeId);
    let edges = graph.edges.filter((edge) => nodesIds.includes(edge.source) && nodesIds.includes(edge.target));
    return { nodes, edges };
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const graph = JSON.parse(e.target.result);
        this.rowData = JSON.stringify(graph);
        this.nodesData = graph.nodes;
        this.edgesData = graph.edges;
        this.nodeLevel = graph.level;
        this.drawCanvas(graph);  // Call drawGraph with the loaded data
        this.hirarchyNodes.push(file.name);
      };
      reader.readAsText(file);
    }
  }

  onSuggestionClick(suggestion: string) {
    this.searchText = suggestion;
    this.suggestions = [];  // Optionally clear the suggestions list
    this.onSearch();  // Optionally trigger the search immediately
  }
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
  }
  onSearch() {
    const targetNode = this.nodesData.find(node => node.label === this.searchText);
    this.searchNodeId = targetNode.nodeId;
    this.simulation.alpha(0.01).restart();
  }
  drawGrid() {
    if(!this.configuration.showGrid) return false;
        // Set line color
    this.ctx.strokeStyle = '#ccc';

    const ctx = this.ctx;
    //const ctx = thisctx
    // Grid properties
    const gridSpacing = 50; // Spacing between grid lines, adjust as needed 
    const scaleSpacing = 100; // Spacing between scale lines, adjust as needed 

    // Calculate zoom-adjusted grid and scale spacing
    const zoomAdjustedGridSpacing = gridSpacing * this.zoomScale;
    const zoomAdjustedScaleSpacing = scaleSpacing * this.zoomScale;

   // const zoomAdjustedGridSpacing = gridSpacing;
    //const zoomAdjustedScaleSpacing = scaleSpacing;

    // Horizontal lines
    for (let y = zoomAdjustedGridSpacing; y < this.height * 100; y += zoomAdjustedGridSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width * 100, y);
      ctx.lineWidth = 0.5;
      this.ctx.stroke();

    }

    // Vertical lines
    for (let x = zoomAdjustedGridSpacing; x < this.width * 100; x += zoomAdjustedGridSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height * 100);
      ctx.lineWidth = 0.5;
      this.ctx.stroke();
    }

    // Draw scale values
    ctx.fillStyle = 'black'; // Adjust color as needed
    ctx.font = '12px Arial'; // Adjust font as needed
    for (let y = zoomAdjustedScaleSpacing; y < this.height * 100; y += zoomAdjustedScaleSpacing) {
     // ctx.fillText((y / this.zoomScale).toFixed(0).toString(), 5, y);
      ctx.fillText((y).toFixed(0).toString(), 5, y);
    }

    // Draw scale values
    for (let x = zoomAdjustedScaleSpacing; x < this.width * 100; x += zoomAdjustedScaleSpacing) {
      //ctx.fillText((x / this.zoomScale).toFixed(0).toString(), x, 15);
      ctx.fillText((x).toFixed(0).toString(), x, 15);
    }

  }
  drawCanvas(graph: any) {
    const distanceScale = d3.scaleThreshold()
      .domain([1, 11, 101, 1001, 10000]) // Breakpoints for the input values
      .range([80, 60, 30, 5, 1]); // Output values for the corresponding ranges
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.nodeId).distance(distanceScale(this.nodesData.length))) // Keep the link force
      .force("charge", d3.forceManyBody().strength(-distanceScale(this.nodesData.length))) // Minimize charge force
      .force("x", d3.forceX(this.width / 2).strength(0.01)) // Minimize x force
      .force("y", d3.forceY(this.height / 2).strength(0.01)) // Minimize y force
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))//.strength(0.01)); // Minimize center force
  

    // Draw links
    graph.edges.forEach(edge => {
      this.ctx.beginPath();
      this.ctx.moveTo(edge.source.x, edge.source.y);
      this.ctx.lineTo(edge.target.x, edge.target.y);
      this.ctx.lineWidth = Math.sqrt(edge.value);
      this.ctx.strokeStyle = '#ccc';
      this.ctx.stroke();
    });
    //console.log('graph.nodes', graph.nodes)
    // Draw nodes and check for nodes within the brush selection area
    this.nodesWithinBrush = [];
    this.nodes = graph.nodes;
    // Draw nodes
    this.nodes.forEach(node => {
      this.ctx.beginPath();
      // Set the color based on node.color condition
      const nodeColor = node.color == 0 ? 'red' : 'black';
      this.ctx.fillStyle = nodeColor;
      if (node.nodeType === 'circle') {
        //TODO: I need circle color based on the node.color condition, if color value is 1 then red or black
        this.ctx.arc(node.x, node.y, 7, 0, Math.PI * 2);
      } else if (node.nodeType === 'diamond') {
        // TODO: I need diamond color based on the node.color condition, if color value is 1 then red or black
        // Draw diamond
        const halfSize = 7;
        this.ctx.moveTo(node.x, node.y - halfSize);
        this.ctx.lineTo(node.x + halfSize, node.y);
        this.ctx.lineTo(node.x, node.y + halfSize);
        this.ctx.lineTo(node.x - halfSize, node.y);
        this.ctx.closePath();
      }
      // this.ctx.fillStyle = 'red'//node.color == 1 ? 'red' : 'green';
      this.ctx.fill();

      // Draw node labels
      this.ctx.fillStyle = 'black';
      this.ctx.font = '12px Arial';
      this.ctx.fillText(node.nodeId, node.x - 10, node.y - 10);
    });

    // Initialize startTime for first frame
    let startTimeNow = performance.now();

    this.simulation
      .nodes(graph.nodes)
      .on("tick", () => {
        // Run your tick function
        this.tick(this.ctx, graph.nodes);

        // Calculate FPS
        const endTime = performance.now();
        const fps = 1000 / (endTime - startTimeNow); // FPS is time between frames in milliseconds
        startTimeNow = endTime; // Update startTime for the next frame

        // Round FPS to nearest common refresh rate (Hz)
        this.fps = this.simulationService.roundToRefreshRate(fps); // Resulting in values like 60Hz, 120Hz, etc.

      });


    this.simulation.force("link")
      .links(graph.edges);
    // Add drag behavior
    d3.select(this.canvas)
      .call(d3.drag()
        .container(this.canvas)
        .subject(this.dragSubject.bind(this)) // Pass event to dragSubject
        .on("start", this.dragstarted.bind(this))
        .on("drag", this.dragged.bind(this))
        .on("end", this.dragended.bind(this))
      )
    // Removed due to hirarchy double click
    // .call(d3.zoom()
    //   .scaleExtent([0.1, 10])
    //   .on('zoom', this.zoomed.bind(this)));
    // Add double-click event listener to the canvas
    d3.select(this.canvas)
      .on('dblclick', this.doubleClicked.bind(this))
      .on('contextmenu', (event)=>{
        this.callBack('rightClick', event);
      })
      .on('mousemove', this.onMouseMove.bind(this))
      .on('mouseout', this.onMouseOut.bind(this));
  }
  tick(ctx: CanvasRenderingContext2D, nodes: any[]) {
    // Clear canvas
    ctx.clearRect(0, 0, this.width, this.height);

    // Set line color
    this.ctx.strokeStyle = '#ccc';

    // Grid properties
    const gridSpacing = 50; // Spacing between grid lines, adjust as needed 
    const scaleSpacing = 100; // Spacing between scale lines, adjust as needed 

    // Calculate zoom-adjusted grid and scale spacing
    const zoomAdjustedGridSpacing = gridSpacing * this.zoomScale;
    const zoomAdjustedScaleSpacing = scaleSpacing * this.zoomScale;


    this.drawGrid()
    // Redraw links
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    
    this.drawLinks(gridSpacing);
    this.drawNodes(nodes, gridSpacing);
    if (this.activeToolName == 'selectNode') {
      // Draw brush selection
      ctx.beginPath();
      // ctx.rect(this.brushX0, this.brushY0, this.brushX1 - this.brushX0, this.brushY1 - this.brushY0);
      ctx.rect(this.brushX0 * this.zoomScale,
        this.brushY0 * this.zoomScale,
        (this.brushX1 - this.brushX0) * this.zoomScale,
        (this.brushY1 - this.brushY0) * this.zoomScale);

      ctx.strokeStyle = '#FF5722';
      ctx.stroke();
    }

    

  }
  drawArrow(ctx: CanvasRenderingContext2D, source: any, target: any) {
    const {x: startX, y:startY} = source;
    const {x: endX, y:endY} = target;

    // Calculate the angle of the line
    let angle = Math.atan2(endY - startY, endX - startX);
    // Calculate the position of the arrowhead (adjusted to be a bit back from the end)
    const arrowEndX = endX - Math.cos(angle) * 10;
    const arrowEndY = endY - Math.sin(angle) * 10;

    // Draw the arrow
    const arrowSize = 10; // Size of the arrow
    ctx.setLineDash([]);
    ctx.save();
    ctx.translate(arrowEndX, arrowEndY);
    ctx.rotate(angle);

    // Set arrow color
    ctx.beginPath();
    ctx.moveTo(-arrowSize, -arrowSize / 2);
    ctx.lineTo(0, 0);
    ctx.lineTo(-arrowSize, arrowSize / 2);
    ctx.stroke();

    ctx.restore();
  }

  drawDirectionArrow(ctx: CanvasRenderingContext2D, start: any, end: any) {
    const arrowSize = 10; // Size of the arrow
  
    // Calculate the angle between start and end points
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
   
    // Save the current state of the context
    ctx.save();
    
    // Move the context to the end point
    ctx.translate(end.x, end.y);
    
    // Rotate the context by the calculated angle
    ctx.rotate(angle);
  
    // Draw the arrowhead
    ctx.beginPath();
    ctx.moveTo(-arrowSize, -arrowSize / 2);  // Left wing
    ctx.lineTo(0, 0);                       // Tip
    ctx.lineTo(-arrowSize, arrowSize / 2);   // Right wing
    ctx.stroke();
  
    // Restore the context to its original state
    ctx.restore();
  }
  
  callBack(type: string, event) {
    if(['exploration', 'editing'].includes(this.activeToolName)) {
      const callbacks = {
        [this.nodeLevel]: {
          [this.activeToolName]: {
            [type]: {}
          }
        }
      }
      const node = this.simulationService.nearestNode(event, this.nodes,this.zoomScale);
      this.callbacks.emit({param:callbacks, event, node});
    }
  }
  revertBackToParent(index) {
    if (this.hirarchyActiveIndex > 0) {

      this.hirarchyActiveIndex = this.hirarchyActiveIndex - 1;
      const parentNode = this.hirarchyNodes[this.hirarchyActiveIndex];

      // Remove all nodes after the parent node in the hierarchy
      this.hirarchyNodes.splice(this.hirarchyActiveIndex + 1);

      if (parentNode) this.loadData(parentNode);
    }
  }
  selectHirarchy(index) {
    const parentFileName = this.hirarchyNodes[index];
    this.hirarchyNodes = this.hirarchyNodes.slice(0, index + 1); // removed 
    this.hirarchyActiveIndex = index; // update the current index

    if (parentFileName) this.loadDataByNameAndIndex(parentFileName, index);
  }
  loadDataByNameAndIndex(fileName, index) {
    d3.json(`assets/${fileName}`).then((data: any) => {
      this.nodesData = data.nodes;
      this.edgesData = data.edges;
      this.shortestPath = [];
      this.activeToolName = 'search'
      this.nodeLevel = this.hierarchy[index].toLocaleLowerCase();
      this.drawCanvas(data);
      if (!this.hirarchyNodes.includes(fileName)) this.hirarchyNodes.push(fileName);

    }).catch((e) => {
      alert(`There is available file named ${fileName}`)
    })
  }
  loadData(fileName) {
    d3.json(`assets/${fileName}`).then((data: any) => {
      this.nodesData = data.nodes;
      this.edgesData = data.edges;
      this.shortestPath = [];
      this.activeToolName = 'search'
      this.drawCanvas(data);  // Call drawGraph with the loaded data
      this.hirarchyActiveIndex = this.hirarchyActiveIndex + 1;
      if (!this.hirarchyNodes.includes(fileName)) this.hirarchyNodes.push(fileName);

    }).catch((e) => {
      alert(`There is available file named ${fileName}`)
    })
  }
 
  doubleClicked(event: MouseEvent) {
    this.callBack('doubleClick', event);
    this.closeTooltip();
    if (['textBoxMode', 'exploration', 'editing'].includes(this.activeToolName)) return false;
    this.dragNode = true;
    // Get the coordinates of the click relative to the canvas
    const mouseX = event.offsetX / this.zoomScale;
    const mouseY = event.offsetY / this.zoomScale;

    // Check if any node is located at the clicked coordinates
    const clickedNode = this.nodes.find(node => {
      if (node.nodeType === 'circle') {
        return Math.sqrt(Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)) <= 7; // Radius of the circle node
      } else if (node.nodeType === 'diamond') {

        // Check if the clicked point is inside the diamond shape
        // Implement diamond shape containment logic
        // TODO: diamond shape double click checking
        return Math.sqrt(Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)) <= 7; // Radius of the circle node
      }
    });

    // If a node is clicked, perform desired action
    if (clickedNode) {
      if (this.hierarchy && this.hierarchy[this.hirarchyActiveIndex + 1]) {
        this.nodeLevel = this.hierarchy[this.hirarchyActiveIndex + 1].toLocaleLowerCase();
        const fileName = `${this.nodeLevel}/network_n_${clickedNode.nodeId}_l_${this.nodeLevel}.json`
        this.loadData(fileName);
      } else {
        alert('File not found!')
      }
    }
  }


  private brushended(selectedNodes: any) {
    // Format the content of the tooltip
    const tooltipContent = selectedNodes.map(node => {
      return `<div>
                <b>ID:</b> ${node.nodeId}<br/>
                <b>Label:</b> ${node.label}<br/>
                <b>Coordinates:</b> (${node.x}, ${node.y})<br/> 
                <b>Symbol Type:</b> ${node.nodeType}<br/>
              </div>`;
    }).join('');

    // Position the tooltip at the upper right side of the SVG/div
    this.showTooltip(tooltipContent);
  }

  private showTooltip(content: string) {
    
    const svg = d3.select(this.element.nativeElement).select('canvas');
    // Ensure the SVG node is not null and is of type HTMLElement
    const svgNode = svg.node() as HTMLElement | null;

    if (svgNode) {
      const svgRect = svgNode.getBoundingClientRect();

      // Positioning the tooltip at the upper right corner
      const xPosition = svgRect.left;
      const yPosition = svgRect.top;

      this.tooltip.html(this.closeButtonHTML() + '<b>Selected Nodes:</b></br>' + content)
        .style("left", `${xPosition}px`)
        .style("top", `${yPosition}px`)
        .transition()
        .duration(200)
        .style("opacity", .9);

      // Adding event listener for close button
      this.tooltip.select(".tooltip-close-btn")
        .on("click", () => this.closeTooltip());
    } else {
      console.error("SVG node is null.");
    }
  }

  closeButtonHTML(): string {
    return '<span class="tooltip-close-btn" style="float: right; cursor: pointer;">&times;</span>';
  }
  zoomed(event) {
    this.zoomScale = event.transform.k;
    this.simulation.alpha(0.3).restart();
  }

  findShortestPath(sourceNodeId: string, targetNodeId: string): any[] {
    const sourceNode = this.nodesData.find(node => node.label === sourceNodeId);
    const targetNode = this.nodesData.find(node => node.label === targetNodeId);

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
        if (edge.source.label === currentNodeId) {
          const neighborId = edge.target.label;
          const distanceToNeighbor = distances[currentNodeId] + 1; // Assuming unweighted edges

          if (distanceToNeighbor < distances[neighborId]) {
            distances[neighborId] = distanceToNeighbor;
            previous[neighborId] = currentNodeId;
            queue.push(neighborId);
          }
        } else if (edge.target.label === currentNodeId) {
          const neighborId = edge.source.label;
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

  }


  calculateDistance(node1: any, node2: any): number {
    // Calculate the Euclidean distance between two nodes
    return Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2));
  }

  dragSubject(event) {
    const [x, y] = d3.pointer(event);
    if (this.activeToolName == 'selectNode') {
      this.brushX0 = this.brushX1 = x / this.zoomScale;
      this.brushY0 = this.brushY1 = y / this.zoomScale;
    }
    return this.draggingNode = this.simulation.find(x / this.zoomScale, y / this.zoomScale);
  }
  dragstarted(event: any, d: any) {
    this.dragNode = false;
    this.nodesWithinBrush = [];
    if(this.searchNodeId == -1 && this.activeToolName == 'search') return false; 
    if (!event.active && this.activeToolName != 'selectNode') this.simulation.alphaTarget(0.3).restart();

    if (this.activeToolName == 'panEnable') {
      const dx = event.dx / this.zoomScale;
      const dy = event.dy / this.zoomScale;
      this.nodes.forEach(node => {
        node.fx = node.x + dx;
        node.fy = node.y + dy;
      });
    } else if (this.activeToolName === 'snapMode') {
      const dx = event.dx / this.zoomScale;
      const dy = event.dy / this.zoomScale;
      this.nodes.forEach(node => {
        node.fx = node.x + dx;
        node.fy = node.y + dy;
      });
    } else {
      //TODO: need to check if conflict with this 
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
  }

  dragged(event: any, d: any) {
    if(this.searchNodeId == -1 && ['search', 'tooltip'].includes(this.activeToolName)) return false; 
    this.dragNode = true;
    if (this.activeToolName == 'selectNode') {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.sourceEvent.clientX - rect.left;
      const mouseY = event.sourceEvent.clientY - rect.top;
      this.brushX1 = mouseX / this.zoomScale;
      this.brushY1 = mouseY / this.zoomScale;
    } else if (this.activeToolName == 'panEnable') {
      // Adjust position of all nodes based on drag event
      const dx = event.dx / this.zoomScale;
      const dy = event.dy / this.zoomScale;
      this.nodes.forEach(node => {
        node.fx = node.x + dx;
        node.fy = node.y + dy;
      });
    } else {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.sourceEvent.clientX - rect.left;
      const mouseY = event.sourceEvent.clientY - rect.top;
      event.subject.fx = mouseX / this.zoomScale;
      event.subject.fy = mouseY / this.zoomScale;
    }

  }

  dragended(event: any, d: any) {
    if(this.searchNodeId == -1 && ['search', 'tooltip'].includes(this.activeToolName)) return false; 
    if (this.activeToolName == 'selectNode') {
      const filteredNode = this.filterNodesWithinBrush(this.nodes, this.brushX0, this.brushY0, this.brushX1, this.brushY1);
      this.brushended(filteredNode);
      this.simulation.alphaTarget(0.01).restart();
    } else if (this.activeToolName == 'textBoxMode') {
      this.createTextBoxAt(event);
    }
    if (!['panEnable','selectNode','snapMode', 'exploration', 'editing', 'search', 'tooltip', 'zoomIn', 'zoomOut'].includes(this.activeToolName)) {
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    if (this.activeToolName == 'panEnable') {
      const dx = event.dx / this.zoomScale;
      const dy = event.dy / this.zoomScale;

      const gridSpacing = 50;  // Define your grid spacing value

      this.nodes.forEach(node => {
        // Apply grid snapping
        node.fx = Math.round((node.x + dx));
        node.fy = Math.round((node.y + dy));
        // node.fx = Math.round((node.x + dx) / gridSpacing) * gridSpacing;
        // node.fy = Math.round((node.y + dy) / gridSpacing) * gridSpacing;
      });
    }

    this.callBack('click', event);
  }
  isNodeInBrush(node: any) {
    const scaledX = node.x * this.zoomScale;
    const scaledY = node.y * this.zoomScale;
    const scaledBrushX0 = Math.min(this.brushX0, this.brushX1) * this.zoomScale;
    const scaledBrushX1 = Math.max(this.brushX0, this.brushX1) * this.zoomScale;
    const scaledBrushY0 = Math.min(this.brushY0, this.brushY1) * this.zoomScale;
    const scaledBrushY1 = Math.max(this.brushY0, this.brushY1) * this.zoomScale;

    return scaledX >= scaledBrushX0 &&
      scaledX <= scaledBrushX1 &&
      scaledY >= scaledBrushY0 &&
      scaledY <= scaledBrushY1;
  }
  filterNodesWithinBrush(nodes, brushX0, brushY0, brushX1, brushY1) {
    return nodes.filter(node => {
      return (
        node.x >= Math.min(brushX0, brushX1) &&
        node.x <= Math.max(brushX0, brushX1) &&
        node.y >= Math.min(brushY0, brushY1) &&
        node.y <= Math.max(brushY0, brushY1)
      );
    });
  }

  private onMouseMove(event: any) {
    if (this.activeToolName == 'selectNode') return false;

    // Get mouse coordinates relative to the canvas
    const mouseX = event.offsetX / this.zoomScale;
    const mouseY = event.offsetY / this.zoomScale;

    // Find the node closest to the mouse cursor
    let closestNode = this.simulationService.nearestNode(event,this.nodes,this.zoomScale);

    // Close the tooltip if no node is close enough
    if (!closestNode) {
        this.closeTooltip();
        return;
    }
    // Check if the hovered node is the same as the previous one
    if (this.previouslyHoveredNode !== closestNode && this.activeToolName =='tooltip') {
        this.previouslyHoveredNode = closestNode;
        
        // Existing tooltip functionality
        this.tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        this.tooltip.html(this.tooltipHTML(closestNode))
            .style("left", (closestNode.x * this.zoomScale) + "px")
            .style("top", ((mouseY * this.zoomScale) - 28) + "px");


        this.tooltip.select(".tooltip-close-btn")
            .on("click", () => this.closeTooltip());
        
    }
    if(['editing', 'exploration'].includes(this.activeToolName) && this.previouslyHoveredNode !== closestNode){
      this.previouslyHoveredNode = closestNode;
      this.callBack('hover', event);
    }
  }

  private onMouseOut(event: any, d: any) {
  }

  private closeTooltip() {
    this.tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  }

  private tooltipHTML(d: any): string {
    return `
    <span class="tooltip-close-btn" style="float: right; cursor: pointer;">&times;</span>
      <b>ID:</b> ${d.nodeId}<br/> 
      <b>Coordinates:</b> (${d.x}, ${d.y})<br/> 
      <b>Label:</b> ${d.label}<br/> 
      <b>Symbol Type:</b> ${d.nodeType}<br/> 
    `;
  }
}