import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserInputService, TaxData} from '../user-input.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-tax-table',
  templateUrl: './tax-table.component.html',
  styleUrls: ['./tax-table.component.css']
})

export class TaxTableComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['taxid', 'name', 'rank'];
  dataSource = new MatTableDataSource<TaxData>();
  displayTaxTable = true;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
      public UserInService: UserInputService,
  ) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.UserInService.shownTaxa;
  }

  refreshTable() {
    this.UserInService.taxaEmitter.subscribe((data: TaxData[]) => {
      this.dataSource.data = data;
    });
  }

  deleteSelectedTaxIDs(){
    this.UserInService.selectedTaxa = [];
    this.UserInService.shownTaxa = [];
    this.UserInService.rankedTaxa = [];
    this.UserInService.sendTaxa();
  }
}
