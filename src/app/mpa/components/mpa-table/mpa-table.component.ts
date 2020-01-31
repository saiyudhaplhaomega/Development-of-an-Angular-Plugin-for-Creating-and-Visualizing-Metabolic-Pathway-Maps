import {Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProteinGroup, PeptideData, ProteinData } from '../../objects/tableobjects';

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

  displayedColumns = ['select', 'representative_accession', 'representative_description'];
  dataSource: MatTableDataSource<ProteinGroup>;
  selection: SelectionModel<ProteinGroup>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() set data(value: ProteinGroup[]) {
    this.dataSource.data = value;
  }
  get data(): ProteinGroup[] {
    return this.dataSource.data;
  }
  @Input() experimentUUID: string;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  constructor() {
    this.dataSource = new MatTableDataSource([]);
    this.selection = new SelectionModel<ProteinGroup>(true, []);
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

export function createNewProtein(id: number): ProteinData {

  const peptides: PeptideData[] = [];

  for (let i = 1; i <= 100; i++) { peptides.push(createNewPeptide(i)); }

  return {
    protein_uuid: id.toString(),
    protein_accession: Math.random().toString(36).substring(7),
  };
}

function createNewPeptide(id: number): PeptideData {

  return {
    peptide_spectrum_matches: [],
    peptide_sequence: Math.random().toString(36).substring(7),
  };
}

export function createNewProteinGroup(id: number): ProteinGroup {
  return {
    proteingroup_uuid: Math.random().toString(36).substring(7),
    representative_accession: Math.random().toString(36).substring(7),
    representative_description: Math.random().toString(36).substring(7),
  };
}
