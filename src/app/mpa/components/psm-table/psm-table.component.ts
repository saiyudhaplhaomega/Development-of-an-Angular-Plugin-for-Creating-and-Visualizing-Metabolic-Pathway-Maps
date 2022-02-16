import {Component, AfterViewInit, Input, ViewChild, OnInit} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {PsmJSON, PsmObject} from '../../objects/tableobjects';
import {MpaTableDataService} from '../../services/mpa-table-data.service';
import {PeptideScope, PsmScope} from '../proteingroup-detail-view/proteingroup-detail-view.component';

@Component({
  selector: 'app-psm-table',
  templateUrl: './psm-table.component.html',
  styleUrls: ['./psm-table.component.css']
})
export class PsmTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['psmID', 'peptideID', 'spectrumID'];
  dataSource: MatTableDataSource<PsmJSON>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() scope: PsmScope;

  constructor(private mpaTableDataService: MpaTableDataService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    if (this.scope === 0) {
      this.mpaTableDataService.selectedProteinGroup.subscribe(proteinGroup => {
        this.dataSource.data = proteinGroup.psmList;
      });
    } else if (this.scope === 1) {
      this.mpaTableDataService.psmsForSelectedPeptide.subscribe(psms => {
        this.dataSource.data = psms;
      });
    }
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

  setPsm(row: PsmObject) {
    this.mpaTableDataService.selectedPsm.next(row);
  }

}

