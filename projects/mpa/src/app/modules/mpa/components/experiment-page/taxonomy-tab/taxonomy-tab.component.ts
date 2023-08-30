import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProteinGroupObject } from '../../../model/tableobjects';
import { MpaTableDataService } from '../../../services/mpa-table-data.service';
@Component({
  selector: 'app-taxonomy-tab',
  templateUrl: './taxonomy-tab.component.html',
  styleUrls: ['./taxonomy-tab.component.scss']
})
export class TaxonomyTabComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'item',
    'taxonomy',
    'description',
    'rank',
    'quantification'
  ]
  dataSource: MatTableDataSource<ProteinGroupObject>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() experimentUUID: string;

  //TODO remove mpaTableDataService -> used only for testing here
  constructor(public mpaTableDataService: MpaTableDataService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.mpaTableDataService.mpaTableData.subscribe((mpaTableData) => {
      //TODO sort IDs -> integer sort, then pass to dataSource.data
      console.log(mpaTableData)
      this.dataSource.data = mpaTableData;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: EventTarget): void {
    // TODO: figure out how to do this with or without the event
    // event.target.value;
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
  }
}
