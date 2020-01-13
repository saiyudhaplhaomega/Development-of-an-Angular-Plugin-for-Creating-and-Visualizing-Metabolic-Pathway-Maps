import {Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { PeptideData } from '../mpa-table/mpa-table.component';

@Component({
  selector: 'app-peptide-table',
  templateUrl: './peptide-table.component.html',
  styleUrls: ['./peptide-table.component.css']
})
export class PeptideTableComponent implements AfterViewInit {

  displayedColumns = ['empty', 'accession', 'description', 'spectral_count', 'sequence'];
  dataSource: MatTableDataSource<PeptideData>;

  @Input() set data(value: PeptideData[]) {
    this.dataSource.data = value;
  }
  get data(): PeptideData[] {
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
