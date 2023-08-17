import { Component, OnInit } from '@angular/core';
import { MetaDataInputService } from './metaddata-input.service';
import { ColumnData } from './metadata-columnData'; 
import Handsontable from 'handsontable/base';
import { ContextMenu } from 'handsontable/plugins';

@Component({
  selector: 'metadata-workflow',
  templateUrl: './metadata-workflow.component.html',
  styleUrls: ['./metadata-workflow.component.scss'],
})
export class MetadataWorkflowComponent implements OnInit {

  constructor(private MetaDataInputService: MetaDataInputService) {}
  columnData: ColumnData[] = [];

  hotSettings: Handsontable.GridSettings = {
    licenseKey: 'non-commercial-and-evaluation',
    columns: [
      {data: "Counter", title: "Counter", type: 'numeric', readOnly: true},
      {data: "Sourcename", title: "Source name", type: 'text'},
      {data: "Projectidentifier", title: "Project identifier", type: "text"},
      {data: "Study", title: "Study", type: "text"},
      {data: "Project", title: "Project", type: "text"},
      {data: "Program", title: "Program", type: "text"},
      {data: "biologicalreplicate", title: "biological replicate", type: "text"},
      {data: "metagenomes", title: "metagenomes", type: "text"},
      {data: "ecologicalmetagenomes", title: "ecological metagenomes", type: "text"},
    ],

    nestedHeaders: [
      [{ label: 'comment', colspan: 6 }, { label: 'characteristics', colspan: 3 }],
      ['Counter', 'Source name', 'Project identifier', 'Study', 'Project', 'Program', 'biological replicate', 'metagenomes', 'ecological metagenomes'],
    ],
    collapsibleColumns: [
      { row: 0, col: 0, collapsible: true },
      { row: 0, col: 6, collapsible: true },
    ],

    height: 'auto',
    manualColumnResize: true,
    columnSorting: true,
    rowHeaders: true,
    // manualColumnMove: true,
    // colHeaders:  true,
    manualRowMove: true,
    multiColumnSorting: true,

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
    this.MetaDataInputService.getColumnData().then(columnData => this.columnData = columnData);
    this.columnData = this.columnData;
  }
}

