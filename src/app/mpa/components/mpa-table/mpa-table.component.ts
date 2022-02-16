import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProteinGroupJSON } from '../../objects/tableobjects';
import {MpaTableDataService} from '../../services/mpa-table-data.service';

@Component({
  selector: 'app-mpa-table',
  templateUrl: './mpa-table.component.html',
  styleUrls: ['./mpa-table.component.css']
})
export class MpaTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['proteinGroupID', 'representativeAccession', 'representativeDescription'];
  dataSource: MatTableDataSource<ProteinGroupJSON>;
  private showDetails = false;
  // selection: SelectionModel<ProteinGroupJSON>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() experimentUUID: string;

  constructor(private mpaTableDataService: MpaTableDataService) {
    this.dataSource = new MatTableDataSource([]);
    // this.selection = new SelectionModel<ProteinGroupJSON>(true, []);
  }

  ngOnInit() {
    this.dataSource.data = this.mpaTableDataService.mpaData;

    this.mpaTableDataService.selectedProteinGroup.subscribe(proteinGroup => {
      if (typeof proteinGroup !== 'undefined') {
        this.showDetails = true;
      }
    });
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
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  //
  // toggleRow(row) {
  //   this.selection.toggle(row);
  // }

  onClick(row) {
    this.mpaTableDataService.resetCompleteSelection();
    this.mpaTableDataService.selectedProteinGroup.next(row);
  }
}

