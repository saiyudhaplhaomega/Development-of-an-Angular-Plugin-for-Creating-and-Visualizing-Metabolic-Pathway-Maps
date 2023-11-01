import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MetaDataInputService } from './metaddata-input.service';
import { ColumnData, ColumnDataObject } from '../model/metadata-columnData';
import { ContextMenu } from 'handsontable/plugins';
import Handsontable from 'handsontable';
import { CheckboxSelectionService } from '../metadata-checkboxselection/checkboxselectionservice';
import { Subscription } from 'rxjs';
import { MetaDataUploadJsonObject } from '../model/metadatauploadjson';

@Component({
  selector: 'metadata-workflow',
  templateUrl: './metadata-workflow.component.html',
  styleUrls: ['./metadata-workflow.component.scss'],
})
export class MetadataWorkflowComponent implements OnInit {
  constructor(
    private metaDataInputService: MetaDataInputService,
    private checkboxService: CheckboxSelectionService,
    private cd: ChangeDetectorRef
  ) {}

  private mergedSelectionSubscription: Subscription;

  mergedSelection: any[] = [];
  columnData: ColumnData[] = [];
  titlesArray: string[] = [];
  titlesString: string = '';
  dataArray: string[] = [];
  dataString: string = '';
  showSelection: boolean = true;
  showTable: boolean = false;

  section1Counter: number = 0;
  section2Counter: number = 0;
  section3Counter: number = 0;
  section4Counter: number = 0;
  section4Countertrue: number = 0;
  HeadersData = this.titlesArray;
  nestedHeadersData: any[][] = [];

  searchResults: any[] = []; // Store the search results
  currentSearchIndex: number = -1; // Index of the currently selected search result

  hotInstance!: Handsontable; // Store the Handsontable instance
  @ViewChild('hotContainer') hotContainer!: ElementRef;

  hotSettings: Handsontable.GridSettings = {
    data: [], // Bind to the fetched data
    columns: this.mergedSelection,

    height: 'auto',
    manualColumnResize: true,
    licenseKey: 'non-commercial-and-evaluation',
    multiColumnSorting: true,
    // manualColumnMove: true,

    filters: true,
    search: true,
    colHeaders: this.HeadersData,
    rowHeaders: true,
    //NestedHeader nimmt keine Arrays oder Strings. Problem lösen!!!
    // nestedHeaders:  [
    //   [
    //     { label: 'A', colspan: 4 },
    //       { label: 'Selection1', colspan: this.section1Counter },
    //       { label: 'B', colspan: 2 },
    //       { label: 'Selection2', colspan: this.section2Counter },
    //       { label: 'Selection3', colspan: this.section3Counter },
    //      { label: 'Selection4', colspan: this.section4Counter },
    //     ],
    //     this.titlesArray,
    //   ],

    //  collapsibleColumns: [
    //    { row: 0, col: 0, collapsible: true },
    //    { row: 0, col: 3, collapsible: true },
    //   { row: 0, col: 6, collapsible: true },
    //   { row: 0, col: 8, collapsible: true },
    //   { row: 0, col: 14, collapsible: true },
    //   { row: 0, col: 15, collapsible: true },
    //  ],

    manualRowMove: true,
    hiddenRows: {
      indicators: true,
    },
    hiddenColumns: {
      indicators: true,
    },
    contextMenu: {
      items: {
        undo: {
          name: 'undo',
        },
        redo: {
          name: 'redo',
        },
        hidden_rows_hide: {
          name: 'hidden_rows_hide',
        },
        hidden_rows_show: {
          name: 'hidden_rows_show',
        },
        separator: ContextMenu.SEPARATOR,
      },
    },
  };

  ngOnInit(): void {
    this.mergedSelectionSubscription = this.checkboxService.mergedSelection$.subscribe((selection) => {
      this.mergedSelection = selection;
      this.titlesArray = this.mergedSelection.map((item) => item.title);
      this.titlesString = this.titlesArray.join(', ');
      this.dataArray = this.mergedSelection.map((item) => item.data);
      this.dataString = this.dataArray.join(', ');
      this.updateNestedHeadersData(); // Call the function to generate the nested headers
      this.hotInstance.updateSettings(this.hotSettings);
    });

    this.mergedSelectionSubscription =
      this.checkboxService.mergedSelection$.subscribe((selection) => {
        this.mergedSelection = selection;

        // Update the columns in hotSettings
        this.hotSettings.columns = this.mergedSelection;

        if (this.hotInstance) {
          // Update the Handsontable instance with new columns
          this.hotInstance.updateSettings(this.hotSettings);
        }
      });

    this.cd.detectChanges();

    this.checkboxService.section1Counter$.subscribe((count) => {
      this.section1Counter = count;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

    this.checkboxService.section2Counter$.subscribe((count) => {
      this.section2Counter = count;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

    this.checkboxService.section3Counter$.subscribe((count) => {
      this.section3Counter = count;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

    this.checkboxService.section4Counter$.subscribe((count) => {
      this.section4Counter = count;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

    this.checkboxService.mergedSelection$.subscribe((selection) => {
      this.mergedSelection = selection;
      this.updateNestedHeadersData(); // Update nestedHeadersData
    });

    this.metaDataInputService.metadataUploadJson.subscribe((obj) => {
      Promise.resolve(obj.metadataJson).then((columnData) => {
        this.columnData = columnData; // Populate columnData with fetched data
        this.hotSettings.data = this.columnData;
        this.initializeHandsontable();
      });
    });

    // this.metaDataInputService.getColumnData().then((columnData) => {
    //   this.columnData = columnData; // Populate columnData with fetched data
    //   this.hotSettings.data = this.columnData; // Update data in hotSettings
    //   this.initializeHandsontable(); // Initialize Handsontable with the data
    // });
  }

  updateNestedHeadersData(): void {
    // Calculate colspan values
    const section1Colspan = this.section1Counter;
    const section2Colspan = this.section2Counter;
    const section3Colspan = this.section3Counter;
    const section4Colspan = this.section4Counter;
    const section4Countertrue = this.section4Counter + 1;
    // Generate the nested header structure based on your function or logic
    this.nestedHeadersData = [
      [
        { label: 'A', colspan: 4 },
        { label: 'Selection1', colspan: section1Colspan },
        { label: 'B', colspan: 2 },
        { label: 'Selection2', colspan: section2Colspan },
        { label: 'Selection3', colspan: section3Colspan },
        { label: 'Selection4', colspan: section4Countertrue },
      ],
      this.titlesArray,
    ];

    // Update the nestedHeaders property in the hotSettings
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

  exportDataAsObject(): ColumnDataObject[] {
    if (this.hotInstance) {
      const data = this.hotInstance.getData();
      const headers = this.dataArray; // Use the separate array of headers
      const result = [];

      for (let i = 0; i < data.length; i++) {
        // Start from the first row since we have separate headers
        const obj: any = {};
        for (let j = 0; j < headers.length; j++) {
          const key = headers[j];
          obj[key] = data[i][j];
        }
        result.push(obj);
      }

      return result;
    }
    return []; // Return an empty array if no data is available
  }

  toggleSelection() {
    this.showSelection = !this.showSelection;
  }

  submit() {
    const data = this.exportDataAsObject();
    console.log(data);
    console.log(this.nestedHeadersData);
    this.metaDataInputService.submiteTable(data);
  }
}
