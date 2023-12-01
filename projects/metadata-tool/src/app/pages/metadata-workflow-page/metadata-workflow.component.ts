import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MetaDataService } from '../../services/metaddata-input.service';
import {
  MetadataJson,
  MetadataJsonObject,
} from '../../model/metadata-columnData';
import { ContextMenu } from 'handsontable/plugins';
import Handsontable from 'handsontable';

import { Subscription } from 'rxjs';
import { MetaDataUploadJsonObject } from '../../model/metadatauploadjson';
import { CheckboxSelectionService } from '../../components/metadata-checkboxselection/checkboxselectionservice';
import { dummyData } from '../../services/dummy-data';

@Component({
  selector: 'metadata-workflow',
  templateUrl: './metadata-workflow.component.html',
  styleUrls: ['./metadata-workflow.component.scss'],
})
export class MetadataWorkflowComponent implements OnInit {
  constructor(
    private metaDataInputService: MetaDataService,
    private checkboxService: CheckboxSelectionService,
    private cd: ChangeDetectorRef
  ) {}

  private mergedSelectionSubscription: Subscription;

  mergedSelection: any[] = [];
  columnData: MetadataJson[] = [];
  columnDataTransform: any[] = [];
  titlesArray: string[] = [];
  titlesString: string = '';
  dataArray: string[] = [];
  dataString: string = '';
  showTable: boolean = false;

  selectableProperties1Counter: number = 0;
  selectableCharacteristicCounter: number = 0;
  selectableProperties2Counter: number = 0;
  selectableCommentsCounter: number = 0;

  HeadersData = this.titlesArray;
  nestedHeadersData: any[][] = [];
  collapsibleColumnsData: any[] = [];

  searchResults: any[] = []; // Store the search results
  currentSearchIndex: number = -1; // Index of the currently selected search result

  hotInstance!: Handsontable; // Store the Handsontable instance
  @ViewChild('hotContainer') hotContainer!: ElementRef;

  hotSettings: Handsontable.GridSettings = {
    data: [], // Bind to the fetched data
    columns: this.mergedSelection,
    collapsibleColumns: true,

    height: 'auto',
    manualColumnResize: true,
    licenseKey: 'non-commercial-and-evaluation',
    multiColumnSorting: true,
    filters: true,
    search: true,
    colHeaders: this.HeadersData,
    rowHeaders: true,
    manualRowMove: true,
    // hiddenColumns: {
    //   columns: [2],
    //   indicators: false,
    // },
    contextMenu: {
      items: {
        undo: {
          name: 'undo',
        },
        redo: {
          name: 'redo',
        },
        separator: ContextMenu.SEPARATOR,
      },
    },
  };

  ngOnInit(): void {
   
    this.columnData = this.metaDataInputService.metadataUploadJson.value.metadataJson;
    this.columnDataTransform = [];
    this.columnData.forEach((col) => {
      const colTransformed = {};
      console.log(col);
      colTransformed['counter'] = col.counter;
      colTransformed['identID'] = col.identID;
      colTransformed['mzID'] = col.mzID;
      colTransformed['mzML'] = col.mzML;
      colTransformed['peptideFile'] = col.peptideFile;
      colTransformed['psmFile'] = col.psmFile;
      colTransformed['spectrumFile'] = col.spectrumFile;
      col.ontId2Param.forEach((val, key) => {
        colTransformed[key] = val;
      });
      this.columnDataTransform.push(colTransformed);
    });

    
    this.hotSettings.data = this.columnDataTransform;
    const selection =  this.checkboxService.mergedSelectionSubject.value;
    this.mergedSelection = selection;
    console.log(this.mergedSelection);
    this.titlesArray = this.mergedSelection.map((item) => item.title);
    console.log("HOT INSTANCE");
    console.log(this.hotInstance); 
    this.hotSettings.columns = this.mergedSelection;
    this.hotSettings.colHeaders = this.titlesArray;

    // console.log(this.hotSettings.data);
    // this.initializeHandsontable(); 


    // this.cd.detectChanges();

    this.checkboxService.selectableProperties1Counter$.subscribe((count) => {
      this.selectableProperties1Counter = count;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

    this.checkboxService.selectableCharacteristicCounter$.subscribe((count) => {
      this.selectableCharacteristicCounter = count;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

    this.checkboxService.selectableProperties2Counter$.subscribe((count) => {
      this.selectableProperties2Counter = count;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

    this.checkboxService.selectableCommentsCounter$.subscribe((count) => {
      this.selectableCommentsCounter = count;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

    this.checkboxService.mergedSelection$.subscribe((selection) => {
      this.mergedSelection = selection;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

   
    // this.metaDataInputService.metadataUploadJson.next(dummyData);
    // this.metaDataInputService.getColumnData().then((columnData) => {
    //   this.columnData = columnData; // Populate columnData with fetched data
    //   this.hotSettings.data = this.columnData; // Update data in hotSettings
    //   this.initializeHandsontable(); // Initialize Handsontable with the data
    // });
  }

  updateNestedHeadersData(): void {
    // Calculate colspan values
    const properties1Colspan = this.selectableProperties1Counter + 3;
    const characteristicColspan = this.selectableCharacteristicCounter + 2;
    const properties2Colspan = this.selectableProperties2Counter + 2;
    const commentsColspan = this.selectableCommentsCounter + 6;

    this.nestedHeadersData = [
      [
        { label: '', colspan: properties1Colspan},
        { label: 'characteristic', colspan: characteristicColspan },
        { label: '', colspan: properties2Colspan },
        { label: 'comments', colspan: commentsColspan },
        { label: 'factor value', colspan: 1 },
      ],
      this.titlesArray,
    ];

    this.hotSettings.nestedHeaders = this.nestedHeadersData;

  }

  private initializeHandsontable(): void {
    this.hotInstance = new Handsontable(
      this.hotContainer.nativeElement,
      this.hotSettings
    );
  }

  onKey(event: any) {
    this.performSearch();
  }

  private performSearch() {
    if (this.hotInstance) {
      const searchField = document.getElementById(
        'search-field'
      ) as HTMLInputElement;
      const search = this.hotInstance.getPlugin('search');

      if (search) {
        const queryResult = search.query(searchField.value);
        console.log(queryResult);

        // Update searchResults and currentSearchIndex
        this.searchResults = queryResult;
        this.currentSearchIndex = 0; // Reset to the first result

        this.hotInstance.render();
      }
    }
  }

  selectNextSearchResult() {
    if (this.searchResults.length > 0) {
      this.currentSearchIndex =
        (this.currentSearchIndex + 1) % this.searchResults.length;
      this.selectSearchResult(this.currentSearchIndex);
    }
  }

  selectPreviousSearchResult() {
    if (this.searchResults.length > 0) {
      this.currentSearchIndex =
        (this.currentSearchIndex - 1 + this.searchResults.length) %
        this.searchResults.length;
      this.selectSearchResult(this.currentSearchIndex);
    }
  }

  selectSearchResult(index: number) {
    if (this.hotInstance) {
      const result = this.searchResults[index];
      this.hotInstance.selectCell(result.row, result.col);
      this.hotInstance.scrollViewportTo(result.row, result.col);
    }
  }

  onExportClick() {
    this.exportData();
  }

  private exportData() {
    if (this.hotInstance) {
      const exportPlugin = this.hotInstance.getPlugin('exportFile');

      exportPlugin.downloadFile('csv', {
        bom: false,
        columnDelimiter: ';',
        columnHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: false,
      });
    }
  }

  exportDataAsObject(): MetadataJsonObject[] {
    if (this.hotInstance) {
      const dataExport = this.hotInstance.getData();
      const headers = this.dataArray;
      const result: MetadataJsonObject[] =
        this.metaDataInputService.metadataUploadJson.value.metadataJson;
      const columnData: MetadataJsonObject[] = [];

      // Create a map of unique IDs to objects in the result array
      const resultMap = new Map(result.map((obj) => [obj.identID, obj]));

      for (let i = 0; i < dataExport.length; i++) {
        const obj: MetadataJsonObject = new MetadataJsonObject();
        for (let j = 0; j < headers.length; j++) {
          const key = headers[j];
          obj[key] = dataExport[i][j];
        }

        // Check if the object with the same ID exists in the result array
        if (resultMap.has(obj.identID)) {
          // Merge the changed data from dataExport into the existing object
          const existingObj = resultMap.get(obj.identID);
          for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== existingObj[key]) {
              existingObj[key] = obj[key];
            } else {
              existingObj['ontId2Param'][key] = obj[key];
            }
          }
        }
      }

      // Convert the map back to an array
      const mergedResult = Array.from(resultMap.values());

      // Update the metadataJson value
      this.metaDataInputService.metadataUploadJson.value.metadataJson =
        mergedResult;
      console.log('merged result');
      console.log(mergedResult);
      return mergedResult;
    }
    return [];
  }

  submit() {
    const dataExport = this.exportDataAsObject();
    this.metaDataInputService.submiteTable(dataExport);
  }

  ngAfterViewInit() {
    this.initializeHandsontable(); 
    this.metaDataInputService.metadataUploadJson.subscribe(
  
      (metadataUploadJson) => {
        // TODO: ugly workaround, this could be much better
        this.columnData = metadataUploadJson.metadataJson;
        this.columnDataTransform = [];
        this.columnData.forEach((col) => {
          const colTransformed = {};
          console.log(col);
          colTransformed['counter'] = col.counter;
          colTransformed['identID'] = col.identID;
          colTransformed['mzID'] = col.mzID;
          colTransformed['mzML'] = col.mzML;
          colTransformed['peptideFile'] = col.peptideFile;
          colTransformed['psmFile'] = col.psmFile;
          colTransformed['spectrumFile'] = col.spectrumFile;
          col.ontId2Param.forEach((val, key) => {
            colTransformed[key] = val;
          });
          this.columnDataTransform.push(colTransformed);
        });
        this.hotSettings.data = this.columnDataTransform;
        
        // if (this.hotInstance) {
        //   // Update the Handsontable instance with new columns
        //   this.hotInstance.updateSettings({
        //     ...this.hotSettings,
        //     columns: this.mergedSelection,
        //     colHeaders: this.titlesArray,
        //   });
        // } else {
        //   // Initialize Handsontable if not already initialized
        //   // this.initializeHandsontable();
        // }
        this.hotInstance.updateData(this.hotSettings.data);
      }
    );
    this.mergedSelectionSubscription =
      this.checkboxService.mergedSelection$.subscribe(
        (selection) => {
          this.mergedSelection = selection;
          this.titlesArray = this.mergedSelection.map((item) => item.title);
          this.titlesString = this.titlesArray.join(', ');
          this.dataArray = this.mergedSelection.map((item) => item.data);
          this.dataString = this.dataArray.join(', ');
          this.updateNestedHeadersData(); // Call the function to generate the nested headers
     
          // if (this.hotInstance) {
            // Update the Handsontable instance with new columns
            this.hotInstance.updateSettings({
              ...this.hotSettings,
              columns: this.mergedSelection,
              colHeaders: this.titlesArray,
            });
          // } else {
          //   // Initialize Handsontable if not already initialized
          //   // 
          // }
        },
        (error) => {
          console.error('Error with mergedSelection$ subscription', error);
        }
      );
  }
}
