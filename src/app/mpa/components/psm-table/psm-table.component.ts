import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PSM } from '../../objects/tableobjects';

@Component({
  selector: 'app-psm-table',
  templateUrl: './psm-table.component.html',
  styleUrls: ['./psm-table.component.css']
})
export class PsmTableComponent implements AfterViewInit {

  displayedColumns = ['peptide', 'spectrum', 'search_engine', 'q_value'];
  dataSource: MatTableDataSource<PSM>;

  @Input() set data(value: PSM[]) {
    console.log(value);
    this.dataSource.data = value;
  }
  get data(): PSM[] {
    return this.dataSource.data;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

