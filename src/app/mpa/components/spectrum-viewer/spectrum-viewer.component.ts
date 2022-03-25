import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartType, ChartData, ChartEvent, ChartConfiguration, LinearScale} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {MpaTableDataService} from '../../services/mpa-table-data.service';
import {rawData, DataPoint} from './mockData';

@Component({
  selector: 'app-spectrum-viewer',
  templateUrl: './spectrum-viewer.component.html',
  styleUrls: ['./spectrum-viewer.component.css']
})
export class SpectrumViewerComponent implements OnInit {

  spectrumData: string;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  xAxisLength = 9000;
  standardDataSet: DataPoint[] = this.prepareData(rawData);
  public scatterChartType: ChartType = 'scatter';
  public scatterChartData: ChartData<'scatter'> = {
    datasets: [
      {
        data: this.standardDataSet,  // implementation under class
        label: '',
        pointStyle: 'line',
        pointRadius: 4,
        backgroundColor: '#25383c',
        borderColor: '#000000',
        showLine: true,
      }
    ]
  };
  public scatterChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    animation: false,
    scales: {
      x: {
        min: 0,
        max: this.xAxisLength,
        grid: {
          color: 'rgba(0, 0, 0, 0)',
        }
      },
      y: {
        min: 0,
        max: 1000
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  constructor(public mpaTableDataService: MpaTableDataService) {
  }

  ngOnInit() {
    this.mpaTableDataService.spectrumData.subscribe(spectrumData => {
      this.spectrumData = spectrumData;
    });
  }

  // automatisiert erstellung nullpunkte direkt vor und nach jedem Datenpunkt im eingereichten Array
  prepareData(localRawData: DataPoint[]) {
    const preparedData: DataPoint[] = [];    // nullpunkte nötig um linie von x-Achse zu Datenpunkt und wieder zurück ziehen zu können
    if (localRawData[0].x !== 0) {
      preparedData.push({x: 0, y: 0});
      // push startpunkt bei 0 falls dort kein Wert vorhanden ist
    }

    for (const localRawDatum of localRawData) {
      preparedData.push({
        x: (localRawDatum.x - 0.01),
        y: 0
      });

      preparedData.push({
          x: localRawDatum.x,
          y: localRawDatum.y
        }
      );

      preparedData.push({
        x: (localRawDatum.x + 0.01),
        y: 0
      });
    }
    preparedData.push({x: this.xAxisLength, y: 0});  // push endpunkt -> schwarze Linie durchgängig auf xAchse vorhanden

    return preparedData;
  }

  onClick() {
    const localRawData = rawData;
    const preparedData: DataPoint[] = [];
    if (localRawData[0].x !== 0) {
      // push startpunkt bei 0 falls dort kein Wert vorhanden ist
      preparedData.push({x: 0, y: 0});
    }


    for (const i in localRawData) {
      if ((localRawData[i].x) === 12 || (rawData[i].x) === 432 || (rawData[i].x) === 6666) {
        preparedData.push({
          x: (localRawData[i].x - 0.01),
          y: 0
        });

        preparedData.push({
            x: localRawData[i].x,
            y: localRawData[i].y
          }
        );

        preparedData.push({
          x: (localRawData[i].x + 0.01),
          y: 0
        });
      }
    }
    preparedData.push({x: this.xAxisLength, y: 0});  // push endpunkt -> schwarze Linie durchgängig auf xAchse vorhanden

    this.scatterChartData.datasets[0].data = preparedData;
    this.scatterChartData.datasets[0].borderColor = '#c05851';
    this.chart.update();
  }

  resetChart() {
    const preparedData = this.prepareData(rawData);
    this.scatterChartData.datasets[0].data = preparedData;
    this.scatterChartData.datasets[0].borderColor = '#000000';
    this.chart.update();
  }

}
