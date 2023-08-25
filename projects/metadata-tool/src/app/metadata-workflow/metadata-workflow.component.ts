import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MetaDataInputService } from './metaddata-input.service';
import { ColumnData } from './metadata-columnData';
import { ContextMenu } from 'handsontable/plugins';
import Handsontable from 'handsontable';

@Component({
  selector: 'metadata-workflow',
  templateUrl: './metadata-workflow.component.html',
  styleUrls: ['./metadata-workflow.component.scss'],
})
export class MetadataWorkflowComponent implements OnInit {

  constructor(private MetaDataInputService: MetaDataInputService) {}
  columnData: ColumnData[] = [];

  searchResults: any[] = []; // Store the search results
  currentSearchIndex: number = -1; // Index of the currently selected search result

  hotInstance!: Handsontable; // Store the Handsontable instance
  @ViewChild('hotContainer') hotContainer!: ElementRef;

  hotSettings: Handsontable.GridSettings = {
    data: [], // Bind to the fetched data
    columns: [
      {data: "Counter", title: "counter", type: 'numeric', readOnly: true},
      {data: "Sourcename", title: "source name", type: 'text'},
      {data: "ProjectIdentifier", title: "Project identifier", type: "text"},
      //{data: "Study", title: "study", type: "text"},
     // {data: "Project", title: "project", type: "text"},
      //{data: "Program", title: "program", type: "text"},
      {data: "BiologicalReplicate", title: "biological replicate", type: "text"},
      {data: "Metagenomes", title: "metagenomes",
      type: 'dropdown',
      source: ['experiment 1', 'experiment 2', 'experiment 3', 'experiment 4']
      },
      {data: "EcologicalMetagenomes", title: "ecological metagenomes", type: "text",},
      //{data: "AnalyticalFraction", title: "analytical fraction metagenomes", type: "text"},
     // {data: "TemperatureCondtions", title: "temperature condtions", type: "text"},
     // {data: "Pressure", title: "pressure", type: "text"},
      //{data: "pH", title: "pH", type: "text"},
      //{data: "CarbonSource", title: "carbon Source", type: "text"},
      //{data: "ElectronSource", title: "electron Source", type: "text"},
      //{data: "CountIdentifiedSpezies", title: "count identified spezies", type: "text"},
      {data: "AssayName", title: "assay name", type: "text"},
      {data: "ExperimentType", title: "experiment type", 
      type: 'dropdown',
      source: ['heat shock', 'experiment 2', 'experiment 3', 'experiment 4']},
      //{data: "TechnologyType", title: "technology type", type: "text"},
      {data: "TechnicalReplicate", title: "technical replicate", type: "text"},
      {data: "Label", title: "label", 
      type: 'autocomplete',
      source: ['Label 1', 'BONCAT', 'SILAC'],
      strict: false},
      //{data: "FractionIdentifier", title: "fraction identifier", type: "text"},
      //{data: "CleavantAgentDetails", title: "cleavant agent details", type: "text"},
      //{data: "Instrument", title: "instrument", type: "text"},
      //{data: "ModificationParameters", title: "modification parameters", type: "text"},
      //{data: "ModificationParameters1", title: "modification parameters.1", type: "text"},
      //{data: "ModificationParameters2", title: "modification parameters.2", type: "text"},
      //{data: "DissociationMethod", title: "dissociation method", type: "text"},
      //{data: "PrecursorMassTolerance", title: "precursor mass tolerance", type: "text"},
      //{data: "FragmentMassTolerance", title: "fragment mass tolerance", type: "text"},
      {data: "DataFile", title: "data file", type: "text"},
      {data: "FileUri", title: "file uri", type: "text"},
      {data: "mzID", title: "mzID", type: "text"},
      {data: "mzML", title: "mzML", type: "text"},
      {data: "FactorValue", title: "factor value", type: "text"},
      //{data: "Comment", title: "comment", type: "text"},
    ],

    height: 'auto',
    manualColumnResize: true,
    licenseKey: 'non-commercial-and-evaluation',
    multiColumnSorting: true,
    // manualColumnMove: true,
    colHeaders:  true,
    filters: true,
    search: true,
    nestedHeaders: [
      [{ label: '', colspan: 3 }, { label: 'characteritics', colspan: 3 },{ label: '', colspan: 2 },{ label: 'comment', colspan: 6 },{ label: 'factor value', colspan: 1 }],
      ['counter', 'source name', 'project identifier', 'biological replicate', 'metagenomes', 
      'ecological metagenomes',"assay name","experiment type","technical replicate","label","data file","file uri","mzID", "mzML", "experiment type"
    ],
    ],
    collapsibleColumns: [
      { row: 0, col: 0, collapsible: true },
      { row: 0, col: 3, collapsible: true },
      { row: 0, col: 6, collapsible: true },
      { row: 0, col: 8, collapsible: true },
      { row: 0, col: 14, collapsible: true },
      { row: 0, col: 15, collapsible: true },
    ],
    manualRowMove: true,
    hiddenRows: {
      indicators: true
    },
    hiddenColumns: {
      indicators: true,
    },
    contextMenu: {
      items: {
        'undo': {
          name: 'undo'
        },
        'redo': {
          name: 'redo'
        },
        'hidden_rows_hide': {
          name: 'hidden_rows_hide'
        },
        'hidden_rows_show': {
          name: 'hidden_rows_show'
        },
        'separator': ContextMenu.SEPARATOR,
        }
      }
  }
 

  

  ngOnInit(): void {
    this.MetaDataInputService.getColumnData().then(columnData => {
      this.columnData = columnData; // Populate columnData with fetched data
      this.hotSettings.data = this.columnData; // Update data in hotSettings
      this.initializeHandsontable(); // Initialize Handsontable with the data
    });
  }



private initializeHandsontable(): void {
  this.hotInstance = new Handsontable(this.hotContainer.nativeElement, this.hotSettings);

}

onKey(event: any) {
  this.performSearch();
}

private performSearch() {
    if (this.hotInstance) {
      const searchField = document.getElementById('search-field') as HTMLInputElement;
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
      this.currentSearchIndex = (this.currentSearchIndex + 1) % this.searchResults.length;
      this.selectSearchResult(this.currentSearchIndex);
    }
  }

  selectPreviousSearchResult() {
    if (this.searchResults.length > 0) {
      this.currentSearchIndex =
        (this.currentSearchIndex - 1 + this.searchResults.length) % this.searchResults.length;
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
    rowHeaders: false
    });
  }
}
}
