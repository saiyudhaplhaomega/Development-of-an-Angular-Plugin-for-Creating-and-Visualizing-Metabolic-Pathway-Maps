import { Component, OnInit, ElementRef, NgZone, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { NetworkCanvasService } from '../../services/network-canvas.service';
import { NetworkManagerService } from '../../services/network-manager.service';
import { Edge, NetworkMap, Node } from '../../models/network-elements.model';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { NetworkData } from '../../models/network-data.model';
import { SimulationService } from './simulation.service';
import { Configuration } from '../../models/configuration.model';

@Component({
  selector: 'vis-network-canvas',
  templateUrl: './network-canvas.component.html',
  styleUrls: ['./network-canvas.component.scss']
})
export class NetworkCanvasComponent implements OnInit {
  hierarchy: string[] = ['MOLECULAR', 'MODULE', 'ORGANELLE']
  nodesData: Node[] = [];
  edgesData: Edge[] = [];
  networkMap: NetworkMap | undefined;
  dataMap: NetworkData | undefined;
  configuration: Configuration | undefined;
  ctx: CanvasRenderingContext2D;
  private simulation: any;
  height = window.innerHeight ; 
  width = window.innerWidth ;
  private nodesWithinBrush: any = [];
  private nodes: any[] = [];
  private canvas;
  public fps: number = 0;
  public activeToolName: string = 'search';
  brushX0 = 0;
  brushY0 = 0;
  brushX1 = 0;
  brushY1 = 0;
  zoomScale: number = 1;
  private tooltip: any;
  private draggingNode: any = null;
  private previouslyHoveredNode: any = null;
  //default setting it to molecular
  public nodeLevel: string = 'molecular';
  private shortestPath: any[] = [];
  public roundingEnabled: boolean = false;
  public orthogonalEnabled: boolean = false;
  searchNodeId: number = -1;
  private dragNode: boolean = false;
  public hirarchyActiveIndex: number = 0;
  private resizeListener: () => void; //for the grid changing size with the screen
  private searchNodeIdSubscription: Subscription;
  private activeToolNameSubscription: Subscription;
  private canvasSubscription: Subscription;
  private ctxSubscription: Subscription;
  //public showGrid: boolean = true;


  @ViewChild('container', { static: true }) canvasContainerRef: ElementRef;
  //@Input() configuration: any;
  @Output() callbacks = new EventEmitter();


  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private http: HttpClient,
    private networkCanvasService: NetworkCanvasService,
    private networkManagerService: NetworkManagerService,
    private simulationService: SimulationService,
    
  ) {
    //this.networkManagerService.initNetworkManager();
  }

  ngOnInit() {
    this.searchNodeIdSubscription = this.networkCanvasService.searchNodeId$.subscribe(id => {
      this.searchNodeId = id;
    });
  
    this.activeToolNameSubscription = this.networkCanvasService.activeToolName$.subscribe(toolName => {
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

    // this.hierarchy = this.configuration.hierarchy;
    this.tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
      
    this.networkCanvasService.config$
      .pipe(distinctUntilChanged())
      .subscribe(config => {
        this.configuration = config;
        // Update other configuration properties as needed
      });

    this.networkCanvasService.networkData$
      .pipe(distinctUntilChanged())
      .subscribe(networkData => {
        //console.log('this is network data in canvas', networkData);
        this.dataMap = networkData;
        //this.nodeList = networkData?.nodeData?.Nodedata || [];
        //this.edgeList = networkData?.edgeData?.Edgedata || [];
        //console.log('this is node from canvas', this.nodeList);
        //console.log('this is edge from canvas', this.edgeList);
      });

    this.networkCanvasService.networkMap$
      .pipe(distinctUntilChanged())
      .subscribe(networkMap => {
        //console.log('this is network map in canvas', networkMap);
        this.networkMap = networkMap;
        if (this.networkMap) {
          this.drawCanvas(this.networkMap);
        }
      });
      
  //console.log('this is network map in canvas', this.networkMap);
    
      //canvas
    
      const mainCanvas = d3
      .select(this.canvasContainerRef.nativeElement)
      .append('canvas')
      .classed('main-canvas', true)
      .attr('width', this.width)
      .attr('height', this.height);
      this.networkCanvasService.canvas = mainCanvas.node();
    
    // get reference to the context of the canvas elements
    //const mainCanvas = d3.select(this.canvasRef.nativeElement);
    this.networkCanvasService.ctx = mainCanvas.node().getContext('2d', { willReadFrequently: true });
   
    // Initialize the simulation
    this.simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id((d: any) => d.nodeId))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(this.width / 2, this.height / 2))
    .on('tick', () => this.tick(this.networkCanvasService.ctx, this.nodes));

    // Set the simulation in the service
    this.networkCanvasService.setSimulation(this.simulation);

    // Add resize event listener
    this.resizeListener = () => this.onResize();
    window.addEventListener('resize', this.resizeListener);

    
  }
  
  initializeNetwork() {
      console.log('this is network map in canvas', this.networkMap.nodes);
      console.log('this is network data in canvas', this.dataMap.edgeData);
      console.log('this is show grid', this.configuration.showGrid);
  }
  get nodeInformation(): Node[] {
    return this.networkCanvasService.nodes;
  }

  get edgeInformation(): Edge[] {
    return this.networkCanvasService.edges;
  }

  getNodeAdditionalData(dataRef: string): any {
    return this.networkManagerService.getNodeAdditionalData(dataRef);
  }

  getEdgeAdditionalData(dataRef: string): any {
    return this.networkManagerService.getEdgeAdditionalData(dataRef);
  }


  //Draw the links
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
  //changing the grid size with changing screen 
  ngOnDestroy() {
    // Remove resize event listener
    window.removeEventListener('resize', this.resizeListener);
    //do i need to unsubscribe the subscription ? on ngOnDestroy? think about it
    
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
  }

  onResize() {
    this.width = window.innerWidth * 0.82;
    this.height = window.innerHeight * 0.9;
    d3.select(this.canvas)
      .attr('width', this.width)
      .attr('height', this.height);
    if (this.networkMap) {
      this.drawCanvas(this.networkMap);
    }
  }
  //drawing the grid 
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
  //drawing the canvas 
  dragSubject(event) {
    const [x, y] = d3.pointer(event);
    if (this.activeToolName == 'selectNode') {
      this.brushX0 = this.brushX1 = x / this.zoomScale;
      this.brushY0 = this.brushY1 = y / this.zoomScale;
    }
    return this.draggingNode = this.simulation.find(x / this.zoomScale, y / this.zoomScale);
  }
  
  drawCanvas(graph: any) {
    const distanceScale = d3.scaleThreshold()
      .domain([1, 11, 101, 1001, 1000]) // Breakpoints for the input values
      .range([80, 60, 30, 5, 1]); // Output values for the corresponding ranges
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.nodeId).distance(distanceScale(this.nodesData.length))) // Keep the link force
      .force("charge", d3.forceManyBody().strength(-distanceScale(this.nodesData.length))) // Minimize charge force
      .force("x", d3.forceX(this.width / 2).strength(0.01)) // Minimize x force
      .force("y", d3.forceY(this.height / 2).strength(0.01)) // Minimize y force
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))//.strength(0.01)); // Minimize center force
  
    this.networkCanvasService.setSimulation(this.simulation); // Set simulation in the service
    // Draw links
    graph.edges.forEach(edge => {
      this.ctx.beginPath();
      this.ctx.moveTo(edge.source.x, edge.source.y);
      this.ctx.lineTo(edge.target.x, edge.target.y);
      //this.ctx.lineWidth = Math.sqrt(edge.value);
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
  private closeTooltip() {
    this.tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  }
  //dragging inside the network Canvas
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

//function inside the drawCanvas
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
      
      
      ///////////////////////////////////////////////////////////////
      //this.loadData(fileName);///////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////
    } else {
      alert('File not found!')
    }
  }
}
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
//bring data into here 
/*
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
} */
//inside the Canvas function 
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
private tooltipHTML(d: any): string {
  return `
  <span class="tooltip-close-btn" style="float: right; cursor: pointer;">&times;</span>
    <b>ID:</b> ${d.nodeId}<br/> 
    <b>Coordinates:</b> (${d.x}, ${d.y})<br/> 
    <b>Label:</b> ${d.label}<br/> 
    <b>Symbol Type:</b> ${d.nodeType}<br/> 
  `;
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
    //const nodeColor = 'green';//node.color === 1 ? 'red' : 'black'; //colorScale(node.color)

    // Set the color based on node type
    let nodeColor = 'black';
    if (node.nodeType === 'circle') {
      nodeColor = colorScale(0.4);
    } else if (node.nodeType === 'diamond') {
      nodeColor = 'orange';
    }
    const nodeSize = widthScale(0.5); //node.width if you want to get it from the data
    
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
drawArrow(ctx: CanvasRenderingContext2D, source: any, target: any) {
  const {x: startX, y:startY} = source;
  const {x: endX, y:endY} = target;

  // Calculate the angle of the line
  let angle = Math.atan2(endY - startY, endX - startX);
  // Calculate the position of the arrowhead (adjusted to be a bit back from the end)
  const arrowEndX = endX - Math.cos(angle) * (10 * this.zoomScale);
  const arrowEndY = endY - Math.sin(angle) * (10 * this.zoomScale);

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


}