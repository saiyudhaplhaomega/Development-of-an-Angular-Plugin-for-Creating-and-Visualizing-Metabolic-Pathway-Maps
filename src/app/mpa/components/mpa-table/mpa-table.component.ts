import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-mpa-table',
  templateUrl: './mpa-table.component.html',
  styleUrls: ['./mpa-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MpaTableComponent implements AfterViewInit {

  displayedColumns = ['select', 'accession', 'description', 'spectral_count', 'peptide_count'];
  dataSource: MatTableDataSource<ProteinData>;
  selection: SelectionModel<ProteinData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  constructor() {
    const proteins: ProteinData[] = [];
    for (let i = 1; i <= 1000; i++) { proteins.push(createNewProtein(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(proteins);
    this.selection = new SelectionModel<ProteinData>(true, []);
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  toggleRow(row) {
    this.selection.toggle(row);
  }
}

function createNewProtein(id: number): ProteinData {

  const peptides: PeptideData[] = [];

  for (let i = 1; i <= 100; i++) { peptides.push(createNewPeptide(i)); }

  return {
    id: id.toString(),
    accession: Math.random().toString(36).substring(7),
    description: Math.random().toString(36).substring(7),
    spectral_count: Math.random().toString(),
    peptide_count: Math.random().toString(),
    peptides: peptides,
  };
}

export interface ProteinData {
  id: string;
  accession: string;
  description: string;
  spectral_count: string;
  peptide_count: string;
  peptides: PeptideData[];
}

function createNewPeptide(id: number): PeptideData {

  return {
    id: id.toString(),
    accession: Math.random().toString(36).substring(7),
    description: Math.random().toString(36).substring(7),
    spectral_count: Math.random().toString(),
    sequence: Math.random().toString(36).substring(7),
  };
}

export interface PeptideData {
  id: string;
  accession: string;
  description: string;
  spectral_count: string;
  sequence: string;
}
