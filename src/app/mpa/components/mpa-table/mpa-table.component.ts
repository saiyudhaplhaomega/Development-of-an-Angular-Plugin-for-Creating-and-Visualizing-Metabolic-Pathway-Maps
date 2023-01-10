import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {MatSort} from '@angular/material/sort';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import {ProteinGroupJSON, ProteinGroupObject} from '../../objects/tableobjects';
import {GroupSelection, MpaTableDataService} from '../../services/mpa-table-data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-mpa-table',
  templateUrl: './mpa-table.component.html',
  styleUrls: ['./mpa-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({visibility: 'hidden'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MpaTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['expandButton', 'proteinGroupID', 'groupType', 'representativeAccession', 'representativeDescription'];
  dataSource: MatTableDataSource<ProteinGroupJSON>;
  showDetails = false;

  expandedElement: string = 'none';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() experimentUUID: string;

  constructor(public mpaTableDataService: MpaTableDataService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.mpaTableDataService.mpaTableData.subscribe(mpaTableData => {
      //TODO sort IDs -> integer sort, then pass to dataSource.data
      this.dataSource.data = mpaTableData;
    });

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

  applyFilter(event: Event) {
    // TODO: figure out how to do this with or without the event
    // event.target.value;
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
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

  onExpand(row: ProteinGroupObject) {
    if (this.expandedElement === row.proteinGroupID) {
      this.expandedElement = 'none';
      return;
    }
    this.expandedElement = row.proteinGroupID;
  }

  onClick(row: ProteinGroupObject) {
    this.mpaTableDataService.resetCompleteSelection();
    this.mpaTableDataService.selectedProteinGroup.next(row);
  }

  onGroupSelection() {
    this.mpaTableDataService.onGroupSelection();
  }

  getRowtype(row: ProteinGroupObject) {
    return 'parentProteinGroupID' in row ? 'subgroup' : 'maingroup';
  }
}

