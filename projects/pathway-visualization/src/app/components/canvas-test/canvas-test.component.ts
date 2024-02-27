import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'vis-canvas-test',
  templateUrl: './canvas-test.component.html',
  styleUrls: ['./canvas-test.component.scss'],
})
export class CanvasTestComponent implements OnInit {
  data = [];
  height = 400;
  width = 750;

  groupSpacing = 4;
  cellSpacing = 2;
  offsetTop = this.height / 5;
  cellSize =
    Math.floor((this.width - 11 * this.groupSpacing) / 100) - this.cellSpacing;

  // create virtual container for visual elements
  customBase = document.createElement('custom');
  // get reference to the virtual container
  virtualSelection = d3.select(this.customBase);

  // map linking color to node id
  colorToNodeMap = {};

  //references to a visible and hidden canvas element
  mainCanvasContext: CanvasRenderingContext2D;
  hiddenCanvasContext: CanvasRenderingContext2D;

  colorIndex = 1;
  selected: number;

  // get reference to the container of the canvas elements
  @ViewChild('container', { static: true }) canvasContainerRef: ElementRef;
  // get reference to the tooltip element
  @ViewChild('tooltip', { static: false }) tooltipRef: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.data = this.createData(1000);

    // create main and hidden canvas elements
    const mainCanvas = d3
      .select(this.canvasContainerRef.nativeElement)
      .append('canvas')
      .classed('main-canvas', true)
      .attr('width', this.width)
      .attr('height', this.height);

    const hiddenCanvas = d3
      .select(this.canvasContainerRef.nativeElement)
      .append('canvas')
      .classed('hidden-canvas', true)
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('style', 'display: none');

    // get reference to the context of the canvas elements
    this.mainCanvasContext = mainCanvas
      .node()
      .getContext('2d', { willReadFrequently: true });
    this.hiddenCanvasContext = hiddenCanvas
      .node()
      .getContext('2d', { willReadFrequently: true });

    this.generateVisualization();
  }

  createData(numberOfSquares: number) {
    return d3.range(numberOfSquares).map((el) => {
      return { value: el };
    });
  }

  onDataChange($event: any) {
    this.data = this.createData(Number($event?.target.value));
    this.generateVisualization();
  }

  // data binding - connects data to virtual elements in the customElement container
  dataBind(data: any[]) {
    // generates a color scale based on the input data
    const colorScale = d3.scaleSequential(d3.interpolateSpectral).domain(
      d3.extent(data, (d) => {
        return d.value;
      })
    );

    // creates a d3 selection of elements that are linked to the data
    // a d3 selection contains an enter selection containing data items that don't have a corresponding element,
    // an update selection containing data items that have a corresponding element,
    // and an exit selection containing elements that do not not longer have any data items
    const join = this.virtualSelection.selectAll('custom.rect').data(data);

    // creates the enter selection for data items that don't have a corresponding element
    const enterSel = join
      .enter()
      .append('custom') // for each data item, a custom (html) element is created
      .attr('class', 'rect') // assigns css class of element to 'rect'
      .attr('x', (d, i) => {
        const x0 = Math.floor(i / 100) % 10;
        const x1 = Math.floor(i % 10);
        return (
          this.groupSpacing * x0 +
          (this.cellSpacing + this.cellSize) * (x1 + x0 * 10)
        );
      })
      .attr('y', (d, i) => {
        const y0 = Math.floor(i / 1000);
        const y1 = Math.floor((i % 100) / 10);
        return (
          this.groupSpacing * y0 +
          (this.cellSpacing + this.cellSize) * (y1 + y0 * 10)
        );
      })
      .attr('width', 0)
      .attr('height', 0);

    // merges the enter selection with the update selection
    join
      .merge(enterSel)
      .transition() // subsequent attributes are animated
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .attr('fillStyle', (d) => {
        const scale = colorScale(d.value);
        return scale;
      })
      .attr('fillStyleHidden', (d) => {
        if (!d.hiddenCol) {
          d.hiddenCol = this.generateColor();
          this.colorToNodeMap[d.hiddenCol] = d;
        }
        return d.hiddenCol;
      });

    const exitSel = join
      .exit()
      .transition()
      .attr('width', 0)
      .attr('height', 0)
      .remove();
  }

  // draws elements from the virtual container to the canvas
  draw(context: CanvasRenderingContext2D, hidden: boolean) {
    // clear canvas
    context.clearRect(0, 0, this.width, this.height);

    // get the elements in the virtual container
    const elements = this.virtualSelection.selectAll('custom.rect');

    // id of element where mouse hovers
    const selected = this.selected;

    // d contains the data item, i the index
    elements.each(function (d: any, i: number) {
      const node = d3.select(this); // selects the current element in the iteration
      // context.fillStyle = node.attr('fillStyle');

      context.fillStyle = node.attr('fillStyle');

      if (d.value === selected) {
        context.fillStyle = 'black';
      }

      if (hidden) {
        context.fillStyle = node.attr('fillStyleHidden');
      }

      context.fillRect(
        Number(node.attr('x')),
        Number(node.attr('y')),
        Number(node.attr('width')),
        Number(node.attr('height'))
      );
    });
  }

  // visual elements are picked by their color
  // this function generates a color for each element
  generateColor() {
    const rgbCode = [];
    this.colorIndex++;

    if (this.colorIndex < 16777215) {
      rgbCode.push(this.colorIndex & 0xff); // & - bitwise AND, 0xff is 255
      rgbCode.push((this.colorIndex & 0xff00) >> 8); // >> bitwise shift operator - shifts 8 bits to the right
      rgbCode.push((this.colorIndex & 0xff0000) >> 16);
    }

    return 'rgb(' + rgbCode.join(',') + ')';
  }

  addMouseOverListener() {
    // adds eventlistener to the main canvas
    this.canvasContainerRef.nativeElement.addEventListener(
      'mousemove',
      (event) => {
        const [mouseX, mouseY] = d3.pointer(event);

        // picks color from hidden canvas
        const color = this.hiddenCanvasContext.getImageData(
          mouseX,
          mouseY,
          1,
          1
        ).data;

        const rgbCode =
          'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';

        // retrieves data value from map
        const nodeData = this.colorToNodeMap[rgbCode];

        d3.select(this.tooltipRef.nativeElement).style('opacity', 0);

        if (nodeData) {
          this.selected = nodeData.value;

          d3.select(this.tooltipRef.nativeElement)
            .style('opacity', 0.8)
            .style('top', mouseY + 5 + 'px')
            .style('left', mouseX + 5 + 'px')
            .html(nodeData.value); // sets the html content of the tooltip
        }

        this.draw(this.mainCanvasContext, false);
        this.draw(this.hiddenCanvasContext, true);
      }
    );
  }

  generateVisualization() {
    this.dataBind(this.data);

    const t = d3.timer((elapsed) => {
      this.draw(this.mainCanvasContext, false);
      if (elapsed > 300) t.stop();
    });

    this.addMouseOverListener();
  }
}
