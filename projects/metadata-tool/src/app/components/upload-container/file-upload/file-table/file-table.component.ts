// file-table.component.ts

import { Component, Input, OnInit } from "@angular/core";
import Handsontable from "handsontable";

@Component({
  selector: "app-file-table",
  template: '<div id="hot" class="handsontable-container"></div>',
  styleUrls: ["./file-table.component.scss"]
})
export class FileTableComponent implements OnInit {
  @Input() categorizedRows: RowData[];
  @Input() acceptedFileRegex;

  ngOnInit() {
    const container = document.getElementById("hot");
    const hot = new Handsontable(container, {
      data: this.generateHandsontableData(),
      columns: this.generateColumnSettings(),
      colHeaders: Object.keys(this.acceptedFileRegex).map((key) =>
        key.toUpperCase()
      ),
      rowHeaders: true,
      contextMenu: true
      // Add additional configuration as needed
    });
  }

  generateHandsontableData(): any[] {
    return this.categorizedRows.map((rowData) => {
      return Object.keys(this.acceptedFileRegex).map((fileType) => {
        return rowData[fileType] ? rowData[fileType].file.name : "";
      });
    });
  }
  generateColumnSettings(): any[] {
    return Object.keys(this.acceptedFileRegex).map((fileType) => {
      return { data: fileType, type: "text" };
    });
  }
}
