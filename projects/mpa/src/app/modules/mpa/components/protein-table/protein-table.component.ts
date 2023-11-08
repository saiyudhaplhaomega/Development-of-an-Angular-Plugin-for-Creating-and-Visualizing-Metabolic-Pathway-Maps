import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProteinJSON, ProteinObject } from '../../model/tableobjects';
import { MpaTableDataService } from '../../services/mpa-table-data.service';

@Component({
  selector: 'app-protein-table',
  templateUrl: './protein-table.component.html',
  styleUrls: ['./protein-table.component.css'],
})
export class ProteinTableComponent implements OnInit, AfterViewInit, OnChanges {
  displayedColumns = ['proteinID', 'name'];
  dataSource: MatTableDataSource<ProteinJSON>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private mpaTableDataService: MpaTableDataService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngOnInit() {
    this.mpaTableDataService.selectedProteinGroup.subscribe((proteinGroup) => {
      this.dataSource.data = proteinGroup.proteinList;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setProtein(row: ProteinObject) {
    this.mpaTableDataService.selectedProtein.next(row);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.dataSource);
  }

  highlightRow(row) {
    return this.mpaTableDataService.highlightIfSelected(row);
  }
}
