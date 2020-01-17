import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';
import { ProteinData } from '../mpa-table/mpa-table.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-protein-table',
  templateUrl: './protein-table.component.html',
  styleUrls: ['./protein-table.component.css']
})
export class ProteinTableComponent implements AfterViewInit {

  displayedColumns = ['empty', 'accession'];
  dataSource: MatTableDataSource<ProteinData>;

  @Input() set data(value: ProteinData[]) {
    console.log(value);
    this.dataSource.data = value;
  }
  get data(): ProteinData[] {
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
