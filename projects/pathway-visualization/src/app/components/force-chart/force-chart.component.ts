import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { SearchBarComponent } from './search-container/search-container.component';

@Component({
  selector: 'app-force-chart',
  template: `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <div class="file-upload-container">
      <input type="file" (change)="onFileSelected($event)" id="fileInput" #fileInput hidden />
    </div>
    <app-search-bar
      [searchText]="searchText"
      [suggestions]="suggestions"
      (searchTextChangedEvent)="onSearchTextChanged($event)"
      (searchEvent)="onSearch()"
      (suggestionClickEvent)="onSuggestionClick($event)"
    ></app-search-bar>
    <div class="main-container">
    <app-control-panel
      (zoomInEvent)="zoomIn()"
      (zoomOutEvent)="zoomOut()"
      (panGraphEvent)="panGraph()"
      (selectNodeEvent)="selectNode()"
      (refreshGraphEvent)="refreshGraph()"
      (toggleCallbackModeEvent)="toggleCallbackMode()"
      (toggleTextBoxModeEvent)="toggleTextBoxMode()"
      (uploadFileEvent)="uploadFile()"
    ></app-control-panel>
    
      <svg width="1500" height="800"></svg>
    </div>
  `,
  styleUrls: ['./force-chart.component.css'],
  encapsulation: ViewEncapsulation.None
}) 
export class MainComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  private simulation: any;
  private tooltip: any;
  private nodesData: any[] = [];  // holds the nodes data for easy access
  searchText = '';
  suggestions: string[] = [];
  zoomScale: number = 1;
  private zoomBehaviour: any;
  private brushEnabled: boolean = false;
  currentTransform: any = d3.zoomIdentity;
  private callbackMode: boolean = false;
  private textBoxMode: boolean = false;
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
    this.zoomBehaviour = d3.zoom()
      .scaleExtent([0.5, 10])
      .filter(event => !event.ctrlKey && event.type !== 'wheel')
      .on('zoom', (event) => {
        this.currentTransform = event.transform;
        d3.select(this.element.nativeElement).select('.container')
          .attr('transform', event.transform);
        this.zoomScale = event.transform.k;
      });

    // Call this function to apply the zoom behavior to the SVG
    this.applyZoomBehaviour();

    d3.select(this.element.nativeElement).select('svg').on('click', (event) => {
      if (this.textBoxMode) {
        this.createTextBoxAt(event);
      }
    });
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
    this.applyZoom();
  }

  zoomOut() {
    this.zoomScale /= 1.1;
    this.applyZoom();
  }

  applyZoomBehaviour() {
    d3.select(this.element.nativeElement).select('svg').call(this.zoomBehaviour);
  }

  applyZoom() {
    // Apply zoom transformation to the container
    const container = d3.select(this.element.nativeElement).select('.container');
    // Update the scale part of the transform
    this.currentTransform = this.currentTransform.scale(this.zoomScale / this.currentTransform.k);

    // Apply the updated transform
    container.call(this.zoomBehaviour.transform, this.currentTransform);
    const svg = d3.select(this.element.nativeElement).select('svg');
    svg.call(this.zoomBehaviour.transform, this.currentTransform);

  }
  panGraph() {
    this.brushEnabled = false;
    const svg = d3.select(this.element.nativeElement).select('svg');
    svg.select(".brush").remove();
    this.applyZoomBehaviour(); // Reapply the zoom behaviour
  }
  selectNode() {
    this.brushEnabled = true;
    const svg = d3.select(this.element.nativeElement).select('svg'),
      width = +svg.attr('width'),
      height = +svg.attr('height');

    // Remove zoom behavior to disable panning
    svg.on('.zoom', null);

    // Add brush
    const brush = d3.brush()
      .extent([[0, 0], [width, height]])
      .on("end", (event) => this.brushended(event));

    svg.append("g")
      .attr("class", "brush")
      .call(brush);
  } 
  refreshGraph() {
    const el = this.element.nativeElement;
    const svg = d3.select(el).select('svg')
    svg.selectAll('*').remove()
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
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const graph = JSON.parse(e.target.result);
        this.nodesData = graph.nodes;
        this.drawGraph(graph);  // Call drawGraph with the loaded data
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
    if (targetNode) {
      // Highlight the node
      d3.selectAll('.nodes g').classed('highlighted', false);
      d3.selectAll(`#node-${targetNode.label.replace(/[^a-zA-Z0-9]/g, '-')}`).classed('highlighted', true);
      d3.selectAll(`text`).classed('highlighted', false);
    }
  }

  private drawGraph(graph: any) {

    const el = this.element.nativeElement;
    const svg = d3.select(el).select('svg'),
      width = +svg.attr('width'),
      height = +svg.attr('height');

    svg.selectAll('*').remove()
    // Add grid lines (horizontal and vertical)
    const grid = svg.append('g')
      .attr('class', 'grid');

    const container = svg.append('g')
      .attr('class', 'container');

    // Grid properties
    const gridSpacing = 50; // Spacing between grid lines, adjust as needed 

    // Horizontal lines
    for (let y = gridSpacing; y < height*100; y += gridSpacing) {
      container.append('line')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', width*100)
        .attr('y2', y)
        .attr('stroke', '#ccc')
        .attr('stroke-width', '1').attr("transform", (`translate(${-width*50},${-height*50})`));
    }

    // Vertical lines
    for (let x = gridSpacing; x < width*100; x += gridSpacing) {
      container.append('line')
        .attr('x1', x)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', height*100)
        .attr('stroke', '#ccc')
        .attr('stroke-width', '1').attr("transform", (`translate(${-width*50},${-height*50})`));
    }
    const defs = svg.append('defs');

    defs.append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '-0 -5 10 10') // position and dimension of the arrow head marker
      .attr('refX', 0)  // position of the arrow head marker on the link (line)
      .attr('refY', 0)  // position of the arrow head marker on the link (line)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')  // arrow head marker path
      .attr('class', 'arrowHead');

    this.nodesData = graph.nodes; 

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.nodeId).distance(60))
      .force("charge", d3.forceManyBody().strength(-60))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = container.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.edges)
      .enter().append("line")
      .attr("stroke-width", (d: any) => {
        return Math.sqrt(d.value)
      })
      .attr('marker-end', 'url(#arrow)');  // apply the arrow marker to the end of each link

    const node = container.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(graph.nodes)
      .enter().append("g");

    node.each(function (d: any) {
      const element = d3.select(this);
      if (d.nodeType === 'circle') {
        element.append("circle").attr("r", 7);
      } else if (d.nodeType === 'diamond') {
        element.append("path")
          .attr('d', d3.symbol()
            .type(d3.symbolDiamond)
            .size(200)());
      }
    });

    node.attr("id", (d: any) => 'node-' + d.label.replace(/[^a-zA-Z0-9]/g, '-'))
      .attr("fill", (d: any) => d.color)
      .call((d3.drag() as any)
        .on("start", (event: any, d: any) => this.dragstarted(event, d))
        .on("drag", (event: any, d: any) => this.dragged(event, d))
        .on("end", (event: any, d: any) => this.dragended(event, d))
      );
    node.on("click", (event: any, d: any) => this.onMouseOver(event, d))
      .on("mouseout", (event: any, d: any) => this.onMouseOut(event, d));

    node.append("text")
      .text((d: any) => d.nodeId).style('font-size', '5px').attr('fill', 'grey').style('text-anchor', 'middle');


    this.simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

    this.simulation.force("link")
      .links(graph.edges);

    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => {
          const deltaX = d.target.x - d.source.x;
          const deltaY = d.target.y - d.source.y;
          const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const normX = deltaX / dist;
          const targetX = d.target.x - (normX * 12);
          return targetX;
        })
        .attr("y2", (d: any) => {
          const deltaX = d.target.x - d.source.x;
          const deltaY = d.target.y - d.source.y;
          const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const normY = deltaY / dist;
          const targetY = d.target.y - (normY * 12);
          return targetY;
        });

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    }
  }
  private brushended(event: any) {
    if (!event.selection) return; // Ignore empty selections

    const transform = this.currentTransform || d3.zoomIdentity;
    const [[x0, y0], [x1, y1]] = event.selection.map(transform.invert, transform);
    const selectedNodes = this.nodesData.filter(d => {
      return x0 <= d.x && d.x < x1 && y0 <= d.y && d.y < y1;
    });

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

  private closeButtonHTML(): string {
    return '<span class="tooltip-close-btn" style="float: right; cursor: pointer;">&times;</span>';
  } 

  private dragstarted(event: any, d: any) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  private dragged(event: any, d: any) {
    d.fx = event.x;
    d.fy = event.y;
  }

  private dragended(event: any, d: any) {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  private onMouseOver(event: any, d: any) {
    if (this.callbackMode) {
      alert('Callback function to be implemented here.');
      return;
    }

    // Existing tooltip functionality
    this.tooltip.transition()
      .duration(200)
      .style("opacity", .9);
    this.tooltip.html(this.tooltipHTML(d))
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 28) + "px");

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
