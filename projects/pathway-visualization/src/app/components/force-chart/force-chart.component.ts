import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

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
  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private http: HttpClient
  ) {
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
    const x = (event.sourceEvent.clientX - rect.left) ///this.zoomScale;
    const y = (event.sourceEvent.clientY - rect.top)///this.zoomScale;

    // Create input element
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-text-box';
    input.style.position = 'absolute';
    input.style.left = `${x}px`;
    input.style.top = `${y}px`;
    input.style.width = '100px';

    // Append input to the body
    document.body.appendChild(input);

    // Set focus on the input
    input.focus();

    input.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const inputValue = input.value;
        if (inputValue) {
          // Draw text on canvas
          this.ctx.font = '20px sans-serif';
          this.ctx.fillStyle = 'black';
          this.ctx.fillText(inputValue, x / this.zoomScale, (y / this.zoomScale) + 20); // Adjust y position based on font size

          // Remove the input
          document.body.removeChild(input);
        }
      }
    });
  }

  clearTextboxes() {
    const svg = d3.select(this.element.nativeElement).select('svg');
    svg.selectAll('foreignObject').remove();
  }

  toggleCallbackMode(mode) {
    this.brushEnabled = false;
    this.panEnabled = false;
    this.textBoxMode = false;
    this.activeToolName = this.activeToolName == mode ? 'search' : mode;
  }

  snapMode() {
    this.brushEnabled = false;
    this.panEnabled = false;
    this.textBoxMode = false;
    this.activeToolName = this.activeToolName == 'snapMode' ? 'search' : 'snapMode';
  }
  toggleTextBoxMode() {
    this.brushEnabled = false;
    this.panEnabled = false;
    this.textBoxMode = false;
    this.activeToolName = this.activeToolName == 'textBoxMode' ? 'search' : 'textBoxMode';
  }

  searchEnable() {
    this.brushEnabled = false;
    this.panEnabled = false;
    this.textBoxMode = false;
    this.activeToolName = 'search';
  }

  zoomIn() {
    this.zoomScale *= 1.1;
    this.simulation.alpha(0.3).restart();
  }

  zoomOut() {
    this.zoomScale /= 1.1;
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
    this.brushEnabled = false;
    this.panEnabled = !this.panEnabled;
    this.textBoxMode = false;
    this.activeToolName = 'search'
  }
  selectNode() {
    this.brushEnabled = !this.brushEnabled;
    this.panEnabled = false;
    this.textBoxMode = false;
    this.activeToolName = 'search'
  }
  shortagePathEnabled() {
    this.brushEnabled = false;
    this.panEnabled = false;
    this.textBoxMode = false;
    this.activeToolName = this.activeToolName == 'shortagePath' ? 'search' : 'shortagePath';
    if (this.simulation) this.simulation.alpha(0.3).restart();
  }
  enableFBS() {
    this.fpsEnabled = !this.fpsEnabled;
  }
  arrowAnimation() {
    this.brushEnabled = false;
    this.panEnabled = false;
    this.textBoxMode = false;
    this.activeToolName = this.activeToolName == 'arrowAnimation' ? 'search' : 'arrowAnimation';
    //TODO: I need to reset animationProgress to 0
    if (this.simulation) this.simulation.alpha(0.3).restart();
  }
  orthogonalMode() {
    this.brushEnabled = false;
    this.panEnabled = false;
    this.textBoxMode = false;
    this.activeToolName = this.activeToolName == 'orthogonalMode' ? 'search' : 'orthogonalMode';
    if (this.simulation) this.simulation.alpha(0.3).restart();
  }
  refreshGraph() {
    this.closeTooltip()
    this.panEnabled = false;
    this.brushEnabled = false;
    this.textBoxMode = false;
    this.activeToolName == 'search'
    d3.selectAll('.input-text-box').remove();
    if (this.nodesData.length) {
      this.nodesData = [];
      this.edgesData = [];
      this.rowData = '';
      this.nodes = [];
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
  drawCanvas(graph: any) {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    // Measure time before updating simulation
    const startTime = performance.now();

    // Set up forces
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.nodeId).distance(60))
      .force("charge", d3.forceManyBody().strength(-60))
      .force("x", d3.forceX(this.width / 2).strength(0.05))
      .force("y", d3.forceY(this.height / 2).strength(0.05))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));

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
      if (node.nodeType === 'circle') {
        this.ctx.arc(node.x, node.y, 7, 0, Math.PI * 2);
      } else if (node.nodeType === 'diamond') {
        // Draw diamond
        const halfSize = 7;
        this.ctx.moveTo(node.x, node.y - halfSize);
        this.ctx.lineTo(node.x + halfSize, node.y);
        this.ctx.lineTo(node.x, node.y + halfSize);
        this.ctx.lineTo(node.x - halfSize, node.y);
        this.ctx.closePath();
      }
      this.ctx.fillStyle = node.color;
      this.ctx.fill();

      // Draw node labels
      this.ctx.fillStyle = 'black';
      this.ctx.font = '12px Arial';
      this.ctx.fillText(node.nodeId, node.x - 10, node.y - 10);
    });

    // Update simulation
    this.simulation
      .nodes(graph.nodes)
      .on("tick", () => {
        this.tick(this.ctx, graph.nodes)
        // Calculate FPS
        const endTime = performance.now();
        this.fps = 1000 / (endTime - startTime);
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
      .on('contextmenu', ()=>{
        this.callBack('rightClick');
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
    const zoomAdjustedGridSpacing = gridSpacing //* this.zoomScale;
    const zoomAdjustedScaleSpacing = scaleSpacing //* this.zoomScale;

    // Horizontal lines
    for (let y = zoomAdjustedGridSpacing; y < this.height * 100; y += zoomAdjustedGridSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width * 100, y);
      ctx.lineWidth = 1;
      this.ctx.stroke();

    }

    // Vertical lines
    for (let x = zoomAdjustedGridSpacing; x < this.width * 100; x += zoomAdjustedGridSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height * 100);
      ctx.lineWidth = 1;
      this.ctx.stroke();
    }
    // Redraw links
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    this.simulation.force("link").links().forEach(link => {
      //this.nodeLevel = organelle
      const startX = link.source.x * this.zoomScale;
      const startY = link.source.y * this.zoomScale;
      const endX = link.target.x * this.zoomScale;
      const endY = link.target.y * this.zoomScale;
      // Determine if the link is part of the shortest path
      const isInShortestPath = this.shortestPath.includes(link.source.label) && this.shortestPath.includes(link.target.label);

      // Set line color to red if it's part of the shortest path, otherwise use the default color
      ctx.strokeStyle = isInShortestPath && this.activeToolName ==='shortagePath' ? 'red' : '#ccc';

      // Draw orthogonal edges if either source or target is organelle
      if (this.activeToolName === 'orthogonalMode') {
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
        // Draw the line
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
        // Calculate the interpolated position of the arrow
        const interpolatedX = link.source.x * (1 - link.animationProgress) + link.target.x * link.animationProgress;
        const interpolatedY = link.source.y * (1 - link.animationProgress) + link.target.y * link.animationProgress;
        // Draw the arrow at the interpolated position
        this.drawArrow(ctx, link.source, { x: interpolatedX, y: interpolatedY });

        // Update animation progress
        link.animationProgress += 0.01; // Adjust animation speed as needed

        // Check if animation has reached its target
        if (link.animationProgress >= 1) {
            link.animationProgress = 1; // Ensure progress doesn't exceed 1
        }
      }


    });

    // Redraw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      if (node.nodeType === 'circle') {
        ctx.arc(node.x * this.zoomScale, node.y * this.zoomScale, 7 * this.zoomScale, 0, Math.PI * 2);
      } else if (node.nodeType === 'diamond') {
        // Draw diamond
        const halfSize = 7 * this.zoomScale; // Adjust size based on this.zoomScale
        ctx.moveTo(node.x * this.zoomScale, node.y * this.zoomScale - halfSize);
        ctx.lineTo(node.x * this.zoomScale + halfSize, node.y * this.zoomScale);
        ctx.lineTo(node.x * this.zoomScale, node.y * this.zoomScale + halfSize);
        ctx.lineTo(node.x * this.zoomScale - halfSize, node.y * this.zoomScale);
        ctx.closePath();
      }
      let fillStyle = node.color;
      if (this.brushEnabled && this.isNodeInBrush(node)) fillStyle = '#FF5722';
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

      if (this.brushEnabled && this.isNodeInBrush(node)) {
        this.nodesWithinBrush.push(node);
      }
    });
    if (this.brushEnabled) {
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

  // Function to draw a direction arrow from start point to end point
  drawDirectionArrow(ctx: CanvasRenderingContext2D, start: any, end: any) {
    const arrowSize = 10; // Size of the arrow
    const angle = Math.atan2(end.y - start.y, end.x - start.x);

    ctx.save();
    ctx.translate(end.x, end.y);
    ctx.rotate(angle);

    // Draw arrow lines
    ctx.beginPath();
    ctx.moveTo(-arrowSize, -arrowSize / 2);
    ctx.lineTo(0, 0);
    ctx.lineTo(-arrowSize, arrowSize / 2);
    ctx.stroke();

    ctx.restore();
  }
  
  drawArrow(ctx: CanvasRenderingContext2D, source: any, target: any) {
    const startX = source.x * this.zoomScale;
    const startY = source.y * this.zoomScale;
    const endX = target.x * this.zoomScale;
    const endY = target.y * this.zoomScale;

    
    // Calculate the angle of the line
    let angle = Math.atan2(endY - startY, endX - startX);
    // Calculate the position of the arrowhead (adjusted to be a bit back from the end)
    const arrowEndX = endX - Math.cos(angle) * 10;
    const arrowEndY = endY - Math.sin(angle) * 10;

    // Draw the arrow
    const arrowSize = 10; // Size of the arrow
    ctx.save();
    ctx.translate(arrowEndX, arrowEndY);
    ctx.rotate(angle);

    // Set arrow color
    //ctx.strokeStyle = '#ff0000'; // Red color

    // Draw arrow lines
    ctx.beginPath();
    ctx.moveTo(-arrowSize, -arrowSize / 2);
    ctx.lineTo(0, 0);
    ctx.lineTo(-arrowSize, arrowSize / 2);
    ctx.stroke();

    ctx.restore();
  }
  callBack(type: string) {
    if(['exploration', 'editing'].includes(this.activeToolName)) {
      const callbacks = {
        [this.nodeLevel]: {
          [this.activeToolName]: {
            [type]: {}
          }
        }
      }
      this.callbacks.emit(callbacks);
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
    this.callBack('doubleClick');
    this.closeTooltip();
    if (this.activeToolName == 'textBoxMode') return false;
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
    if (this.brushEnabled) {
      this.brushX0 = this.brushX1 = x / this.zoomScale;
      this.brushY0 = this.brushY1 = y / this.zoomScale;
    }
    return this.draggingNode = this.simulation.find(x / this.zoomScale, y / this.zoomScale);
  }
  dragstarted(event: any, d: any) {
    this.dragNode = false;
    this.nodesWithinBrush = [];
    if (!event.active && !this.brushEnabled) this.simulation.alphaTarget(0.3).restart();

    if (this.panEnabled) {
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
    this.dragNode = true;
    if (this.brushEnabled) {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.sourceEvent.clientX - rect.left;
      const mouseY = event.sourceEvent.clientY - rect.top;
      this.brushX1 = mouseX / this.zoomScale;
      this.brushY1 = mouseY / this.zoomScale;
    } else if (this.panEnabled) {
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
    if (!event.active) this.simulation.alphaTarget(0);
    if (this.brushEnabled) {
      const filteredNode = this.filterNodesWithinBrush(this.nodes, this.brushX0, this.brushY0, this.brushX1, this.brushY1);
      this.brushended(filteredNode);
      this.simulation.alphaTarget(0.01).restart();
    } else if (this.activeToolName == 'textBoxMode') {
      this.createTextBoxAt(event);
    }
    if (!this.panEnabled && !this.brushEnabled && this.activeToolName != 'snapMode') {
      event.subject.fx = null;
      event.subject.fy = null;
    }
    this.callBack('click');
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
    if (this.brushEnabled) return false;

    // Get mouse coordinates relative to the canvas
    const mouseX = event.offsetX / this.zoomScale;
    const mouseY = event.offsetY / this.zoomScale;

    // Find the node closest to the mouse cursor
    let closestNode = null;
    let minDistance = 10;

    this.nodes.forEach(node => {
        const distance = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2);
        if (distance < minDistance) {
            minDistance = distance;
            closestNode = node;
        }
    });

    // Close the tooltip if no node is close enough
    if (!closestNode) {
        this.closeTooltip();
        return;
    }

    // Check if the hovered node is the same as the previous one
    if (this.previouslyHoveredNode !== closestNode) {
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
        this.callBack('hover');
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