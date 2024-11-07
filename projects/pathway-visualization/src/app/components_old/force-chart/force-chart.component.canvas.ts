import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { SearchBarComponent } from './search-container/search-container.component';

@Component({
  selector: 'app-force-chart',
  templateUrl: `./force-chart.component.html`,
  styleUrls: ['./force-chart.component.css'],
  encapsulation: ViewEncapsulation.None
}) 

export class MainComponent implements OnInit {
  height = window.innerHeight * 0.9;
  width = window.innerWidth * 0.87;
  hierarchy :string[] = ['TOP', 'MID', 'END']
  brushX0 = 0;
  brushY0 = 0;
  brushX1 = 0;
  brushY1 = 0;
  // get reference to the container of the canvas elements
  @ViewChild('container', { static: true }) canvasContainerRef: ElementRef;
  // @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef;
  ctx: CanvasRenderingContext2D;
  private simulation: any;
  private tooltip: any;
  private nodesData: any[] = [];  // holds the nodes data for easy access
  private rowData: string = '';
  private nodes: any[] = [];
  searchText = '';
  searchNodeId: number = 0;
  suggestions: string[] = [];
  zoomScale: number = 1;
  private zoomBehaviour: any;
  public hirarchyActiveIndex: number = 0;
  private brushEnabled: boolean = false;
  private panEnabled: boolean = false;
  private dragNode: boolean = false;
  private draggingNode: any = null;
  currentTransform: any = d3.zoomIdentity;
  private callbackMode: boolean = false;
  private textBoxMode: boolean = false;
  private canvas;
  private nodesWithinBrush: any = [];
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
    const mainCanvas =  d3
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
  createTextBoxAt(event: MouseEvent) {
    // Clear existing textboxes
    this.clearTextboxes();

    const svg = d3.select(this.element.nativeElement).select('svg');
    const [x, y] = d3.pointer(event, svg.node() as SVGSVGElement);

    const foreignObject = svg.append('foreignObject')
      .attr('x', x)
      .attr('y', y)
      .attr('width', 100)
      .attr('height', 30);

    const div = foreignObject.append('xhtml:div');

    const input = div.append('input')
      .attr('type', 'text')
      .attr('style', 'width: 100px;');

    // Set focus on the newly created input box, checking if it's not null
    const inputNode = input.node() as HTMLInputElement | null;
    if (inputNode) {
      inputNode.focus();
    }

    input.on('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const inputValue = inputNode ? inputNode.value : '';
        if (inputValue) {
          d3.select(this.element.nativeElement).select('.container').append('text')
            .attr('x', x)
            .attr('y', y)
            .text(inputValue)
            .attr('font-family', 'sans-serif')
            .attr('font-size', '20px')
            .attr('fill', 'black');
        }

        // Remove the foreignObject
        foreignObject.remove();
      }
    });
  }

  clearTextboxes() {
    const svg = d3.select(this.element.nativeElement).select('svg');
    svg.selectAll('foreignObject').remove();
  } 

  toggleCallbackMode() {
    this.callbackMode = !this.callbackMode;
    alert(`Callback mode is now ${this.callbackMode ? 'enabled' : 'disabled'}.`);
  }

  toggleTextBoxMode() {
    this.textBoxMode = !this.textBoxMode;
    alert(`Text box mode is now ${this.textBoxMode ? 'enabled' : 'disabled'}.`);
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
    this.ctx.clearRect(0, 0, this.width/ this.zoomScale, this.height/this.zoomScale);

    // // Update the scale part of the transform
    this.ctx.scale(this.zoomScale, this.zoomScale);

    // // Clear the canvas and redraw with the updated scale
    this.tick(this.ctx, this.nodesData); // Assuming you have a tick function to redraw nodes and links

  }
  panGraph() {
    this.brushEnabled = false;
    this.panEnabled = true;
  }
  selectNode() {
    this.brushEnabled = true;
    this.panEnabled = false;
  } 
  refreshGraph() {
    this.nodesData = [];
    this.drawCanvas({edges: [], nodes: []})
    this.simulation.alpha(1).restart();
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
  filterNodesByLabel(graph, level) {
    let nodes = graph.nodes.filter((node)=>node.level == level);
    let nodesIds = nodes.map((node)=>node.nodeId);
    let edges = graph.edges.filter((edge)=>nodesIds.includes(edge.source) && nodesIds.includes(edge.target));
    return {nodes, edges};
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const graph = JSON.parse(e.target.result);
        this.rowData = JSON.stringify(graph);
        const {nodes, edges} = this.filterNodesByLabel(graph, this.hierarchy[0]);
        this.nodesData = nodes;
        this.drawCanvas({edges, nodes});  // Call drawGraph with the loaded data
      };
      reader.readAsText(file);
    }
  } 

  onSuggestionClick(suggestion: string) {
    this.searchText = suggestion;
    this.suggestions = [];  // Optionally clear the suggestions list
    this.onSearch();  // Optionally trigger the search immediately
  } 
  onSearch() {
    const targetNode = this.nodesData.find(node => node.label === this.searchText);
    this.searchNodeId = targetNode.nodeId;
    this.simulation.alpha(0.01).restart(); 
  }
  drawCanvas(graph: any) {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
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
    .on("tick", () => this.tick(this.ctx, graph.nodes));

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
    .on('dblclick', this.doubleClicked.bind(this));
  }
  revertBackToParent () {
    if(this.hirarchyActiveIndex > 0) {
      this.hirarchyActiveIndex = this.hirarchyActiveIndex - 1;
      const prevLabel = this.hierarchy[this.hirarchyActiveIndex+1];
      const {nodes, edges} = this.filterNodesByLabel(JSON.parse(this.rowData), prevLabel);

      this.nodesData = nodes;
      this.drawCanvas({edges, nodes});  // Call drawGraph with the loaded data
    }
  }
  // to expand the hirarchy
  doubleClicked(event: MouseEvent) {
    this.dragNode = true;
    // Get the coordinates of the click relative to the canvas
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    // Check if any node is located at the clicked coordinates
    const clickedNode = this.nodes.find(node => {
        if (node.nodeType === 'circle') {
            return Math.sqrt(Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)) <= 7; // Radius of the circle node
        } else if (node.nodeType === 'diamond') {
            
            // Check if the clicked point is inside the diamond shape
            // Implement diamond shape containment logic
            //TODO: dimond shape double click checking
            return Math.sqrt(Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)) <= 7; // Radius of the circle node
        }
    });

    // If a node is clicked, perform desired action
    if (clickedNode) {
        const findIndex = this.hierarchy.findIndex((h)=> h==clickedNode.level);
        const nextLabelIndex = findIndex + 1;
        const nextLabel = this.hierarchy[nextLabelIndex];
        this.hirarchyActiveIndex = nextLabelIndex
        const {nodes, edges} = this.filterNodesByLabel(JSON.parse(this.rowData), nextLabel);

        // Implement your action here, such as opening a modal, showing details, etc.
        this.nodesData = nodes;
        this.drawCanvas({edges, nodes});  // Call drawGraph with the loaded data
    }
  }

  tick(ctx: CanvasRenderingContext2D, nodes: any[]) {
    // Clear canvas
    ctx.clearRect(0, 0, this.width, this.height);
  
    // Grid properties
    const gridSpacing = 50; // Spacing between grid lines, adjust as needed 

    // Set line color
    this.ctx.strokeStyle = '#ccc';

    // Horizontal lines
    for (let y = gridSpacing; y < this.height * 100; y += gridSpacing) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.width * 100, y);
        ctx.lineWidth = 1;
        this.ctx.stroke();
        
    }

    // Vertical lines
    for (let x = gridSpacing; x < this.width * 100; x += gridSpacing) {
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
      ctx.beginPath();
      ctx.moveTo(link.source.x * this.zoomScale, link.source.y * this.zoomScale);
      ctx.lineTo(link.target.x *  this.zoomScale, link.target.y * this.zoomScale);
      ctx.stroke();
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
      //ctx.fillStyle = node.color;
      //this.searchNodeId
      let fillStyle = node.color;
      if(this.brushEnabled && this.isNodeInBrush(node)) fillStyle = '#FF5722';
      if(this.searchNodeId && this.searchNodeId === node.nodeId) fillStyle = '#FF5722';

      

      ctx.fillStyle = fillStyle;
      ctx.fill();

      // Draw border
      if ((this.searchNodeId && this.searchNodeId === node.nodeId)) {
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

  }
  
  private brushended(selectedNodes: any) {
    // Format the content of the tooltip
    const tooltipContent = selectedNodes.map(node => {
      return `<div>
                <b>ID:</b> ${node.nodeId}<br/>
                <b>Label:</b> ${node.label}<br/>
                <b>Symbol Type:</b> ${node.nodeType}<br/>
              </div>`;
    }).join('');

    // Position the tooltip at the upper right side of the SVG/div
    this.showTooltip(tooltipContent);
  }

  private showTooltip(content: string) {
    const svg = d3.select(this.element.nativeElement).select('svg');

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
  dragSubject(event) {
    const [x, y] = d3.pointer(event);
    if (this.brushEnabled) {
        this.brushX0 = this.brushX1 = x / this.zoomScale;
        this.brushY0 = this.brushY1 = y / this.zoomScale;
        // this.brushX0 = this.brushX1 = x;
        // this.brushY0 = this.brushY1 = y;
    }
    return this.draggingNode = this.simulation.find(x / this.zoomScale, y / this.zoomScale);
  }
  dragstarted(event: any, d: any) {
    this.dragNode = false;
    this.nodesWithinBrush = [];
    if (!event.active && !this.brushEnabled) this.simulation.alphaTarget(0.3).restart();
  
    if(this.panEnabled) {
      const dx = event.dx / this.zoomScale;
      const dy = event.dy / this.zoomScale;
      this.nodes.forEach(node => {
          node.fx = node.x + dx;
          node.fy = node.y + dy;
      });
    }else {
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
    } else if(this.panEnabled){
      // Adjust position of all nodes based on drag event
      const dx = event.dx / this.zoomScale;
      const dy = event.dy / this.zoomScale;
      this.nodes.forEach(node => {
          node.fx = node.x + dx;
          node.fy = node.y + dy;
      });
    } else {
        event.subject.fx = event.x / this.zoomScale;
        event.subject.fy = event.y / this.zoomScale;
    }

  }

  dragended(event: any, d: any) {
    if (!event.active) this.simulation.alphaTarget(0);
    if(this.brushEnabled){
      const filteredNode = this.filterNodesWithinBrush(this.nodes, this.brushX0, this.brushY0, this.brushX1, this.brushY1);
      this.brushended(filteredNode);
      this.simulation.alphaTarget(0.01).restart();
    } 
    //if(!this.dragNode) this.onMouseOver(this.draggingNode);
    if(!this.panEnabled && !this.brushEnabled) {
      event.subject.fx = null;
      event.subject.fy = null;
    }
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
  private onMouseOver(d: any) {
    if (this.callbackMode) {
      alert('Callback function to be implemented here.');
      return;
    }

    // Existing tooltip functionality
    this.tooltip.transition()
      .duration(200)
      .style("opacity", .9);
    this.tooltip.html(this.tooltipHTML(d))
      .style("left", (d.x) + "px")
      .style("top", (d.y - 28) + "px");

    this.tooltip.select(".tooltip-close-btn")
      .on("click", () => this.closeTooltip());
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
