import {Component, ViewChild, AfterViewInit, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PeptideJSON, ProteinJSON} from '../../objects/tableobjects';
import {MpaTableComponent} from '../mpa-table/mpa-table.component';
import {MpaTableDataService} from '../../services/mpa-table-data.service';

@Component({
  selector: 'app-peptide-table',
  templateUrl: './peptide-table.component.html',
  styleUrls: ['./peptide-table.component.css']
})
export class PeptideTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id'];
  dataSource: MatTableDataSource<PeptideJSON>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private mpaTableDataService: MpaTableDataService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.mpaTableDataService.selectedProteinGroup.subscribe(proteinGroup => {
      this.dataSource.data = proteinGroup.peptideList;
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

  setPeptide(peptide: PeptideJSON) {
    this.mpaTableDataService.selectedPeptide.next(peptide);
  }
}
