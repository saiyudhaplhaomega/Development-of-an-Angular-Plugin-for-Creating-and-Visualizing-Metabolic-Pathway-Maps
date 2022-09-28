import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {MpaTableDataService} from '../../services/mpa-table-data.service';
import {SpectrumDataObject} from './spectrum-data-object';

export type DataPoint = {
  x: number,
  y: number,
};

@Component({
  selector: 'app-spectrum-viewer',
  templateUrl: './spectrum-viewer.component.html',
  styleUrls: ['./spectrum-viewer.component.css']
})
export class SpectrumViewerComponent implements OnInit {

  // TODO : fix overlapping of same Ions within different sets -> ions within y1 AND y2 currently produce two columns -> one overlaps over the other, hindering visibility 
  // showIon states
  private showY1 = false;
  private showY2 = false;
  private showB1 = false;
  private showB2 = false;

  // colors
  private defaultColor = '#999999';
  private y1Color = '#10FFCB';
  private y2Color = '#418700';
  private b1Color = '#e107ae';
  private b2Color = '#f5064a';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  xAxisLength = 1000;
  yAxisLength = 101000;
  public scatterChartType: ChartType = 'scatter';
  public scatterChartData: ChartData<'scatter'> = {
    datasets: [
      {
        data: [],
        label: 'noise',
        pointStyle: 'line',
        pointRadius: 3,
        backgroundColor: this.defaultColor,
        borderColor: this.defaultColor,
        borderWidth: 1,
        showLine: true,
      },
      {
        data: [],
        label: 'y1',
        pointStyle: 'line',
        pointRadius: 3,
        backgroundColor: this.defaultColor,
        borderColor: this.defaultColor,
        borderWidth: 1,
        showLine: true
      },
      {
        data: [],
        label: 'y2',
        pointStyle: 'line',
        pointRadius: 3,
        backgroundColor: this.defaultColor,
        borderColor: this.defaultColor,
        borderWidth: 1,
        showLine: true,
      },
      {
        data: [],
        label: 'b1',
        pointStyle: 'line',
        pointRadius: 3,
        backgroundColor: this.defaultColor,
        borderColor: this.defaultColor,
        borderWidth: 1,
        showLine: true,
      },
      {
        data: [],
        label: 'b2',
        pointStyle: 'line',
        pointRadius: 3,
        backgroundColor: this.defaultColor,
        borderColor: this.defaultColor,
        borderWidth: 1,
        showLine: true,
      }
    ]
  };
  public scatterChartOptions: ChartConfiguration['options'] = {
    animation: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'm/z',
        },
        min: 0,
        max: this.xAxisLength,
        grid: {
          color: 'rgba(0, 0, 0, 0)',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Relative Abundance',
        },
        min: 0,
        max: this.yAxisLength,
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public requestingSpectrum = true;

  constructor(public mpaTableDataService: MpaTableDataService) {
    this.mpaTableDataService.requestingSpectrum.subscribe(val => {
      this.requestingSpectrum = val;
    });
  }

  ngOnInit() {
    /*this.mpaTableDataService.spectrumData.subscribe(spectrumData => {
      this.spectrumData = spectrumData;
    }); */
    this.mpaTableDataService.spectrumDataObject$.subscribe({
      next: dataObject => this.handleSpectrumServiceData(dataObject),
      complete: () => console.log('handleSpectrumServiceData: complete notification')
    });
  }

  handleSpectrumServiceData(dataObject: SpectrumDataObject) {
    this.scatterChartData.datasets[0].data = this.prepareData(dataObject.rest);
    this.scatterChartData.datasets[1].data = this.prepareData(dataObject.ySingle);
    this.scatterChartData.datasets[2].data = this.prepareData(dataObject.yDouble);
    this.scatterChartData.datasets[3].data = this.prepareData(dataObject.bSingle);
    this.scatterChartData.datasets[4].data = this.prepareData(dataObject.bDouble);

    this.chart?.update();
  }

  prepareData(localRawData: DataPoint[]) {    // creates 2 dataPoints for every dataPoint in the rawData -> 1 in front, 1 behind on the x-Axis
    const preparedData: DataPoint[] = [];       // these are needed to plot the line from y=0 to y=dataPointY and back to y=0 -> creates a line
    if (localRawData.length > 0) {
      if (localRawData[0].x !== 0) {
        preparedData.push({x: 0, y: 0});          //push starting point at x=0, if there is no value there
      }

      for (let i in localRawData) {
        preparedData.push({
          x: (localRawData[i].x - 0.01),
          y: 0,
        });

        preparedData.push({
            x: localRawData[i].x,
            y: localRawData[i].y,
          }
        );

        preparedData.push({
          x: (localRawData[i].x + 0.01),
          y: 0,
        });
      }
      preparedData.push({x: this.xAxisLength, y: 0});  // push endpoint -> so the plotted line doesn't stop and goes all the way to the end of the x-Axis
    }
    return preparedData;
  }

  toggleY1() {   // sets border and backgroundColor so that when datapoint is hovered over the correct color is displayed
    this.showY1 = !this.showY1;
    this.scatterChartData.datasets[1].borderColor = ((this.showY1 === false) ? this.defaultColor : this.y1Color);
    this.scatterChartData.datasets[1].backgroundColor = ((this.showY1 === false) ? this.defaultColor : this.y1Color);
    this.chart?.update();
  }

  toggleY2() {
    this.showY2 = !this.showY2;
    this.scatterChartData.datasets[2].borderColor = ((this.showY2 === false) ? this.defaultColor : this.y2Color);
    this.scatterChartData.datasets[2].backgroundColor = ((this.showY2 === false) ? this.defaultColor : this.y2Color);
    this.chart?.update();
  }

  toggleB1() {
    this.showB1 = !this.showB1;
    this.scatterChartData.datasets[3].borderColor = ((this.showB1 === false) ? this.defaultColor : this.b1Color);
    this.scatterChartData.datasets[3].backgroundColor = ((this.showB1 === false) ? this.defaultColor : this.b1Color);
    this.chart?.update();
  }

  toggleB2() {
    this.showB2 = !this.showB2;
    this.scatterChartData.datasets[4].borderColor = ((this.showB2 === false) ? this.defaultColor : this.b2Color);
    this.scatterChartData.datasets[4].backgroundColor = ((this.showB2 === false) ? this.defaultColor : this.b2Color);
    this.chart?.update();
  }

  resetChart() {
    this.scatterChartData.datasets[1].borderColor = this.defaultColor;
    this.scatterChartData.datasets[1].backgroundColor = this.defaultColor;
    this.scatterChartData.datasets[2].borderColor = this.defaultColor;
    this.scatterChartData.datasets[2].backgroundColor = this.defaultColor;
    this.scatterChartData.datasets[3].borderColor = this.defaultColor;
    this.scatterChartData.datasets[3].backgroundColor = this.defaultColor;
    this.scatterChartData.datasets[4].borderColor = this.defaultColor;
    this.scatterChartData.datasets[4].backgroundColor = this.defaultColor;
    this.showY1 = false;
    this.showY2 = false;
    this.showB1 = false;
    this.showB2 = false;
    this.chart?.update();
  }

}
