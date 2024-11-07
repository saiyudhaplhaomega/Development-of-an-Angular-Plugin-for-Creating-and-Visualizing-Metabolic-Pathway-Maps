import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { NetworkCanvasService } from '../../services/network-canvas.service';
import { NetworkManagerService } from '../../services/network-manager.service';
import { Edge, NetworkMap, Node } from '../../models/network-elements.model';
import { distinctUntilChanged } from 'rxjs';
import { NetworkData } from '../../models/network-data.model';
import { SimulationService } from './simulation.service';

@Component({
  selector: 'vis-network-canvas',
  templateUrl: './network-canvas.component.html',
  styleUrls: ['./network-canvas.component.scss']
})
export class NetworkCanvasComponent implements OnInit {
  nodesData: Node[] = [];
  edgesData: Edge[] = [];
  networkMap: NetworkMap | undefined;
  dataMap: NetworkData | undefined;
  ctx: CanvasRenderingContext2D;
  private simulation: any;
  height = window.innerHeight * 0.9;
  width = window.innerWidth * 0.82;
  private nodesWithinBrush: any = [];
  private nodes: any[] = [];
  private canvas;
  public fps: number = 0;
  
  @ViewChild('container', { static: true }) canvasContainerRef: ElementRef;
  

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
      });
  //console.log('this is network map in canvas', this.networkMap);
    
      //canvas
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
  
  initializeNetwork() {
      console.log('this is network map in canvas', this.networkMap.nodes);
      console.log('this is network data in canvas', this.dataMap.edgeData);
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
  /*
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
  */


}