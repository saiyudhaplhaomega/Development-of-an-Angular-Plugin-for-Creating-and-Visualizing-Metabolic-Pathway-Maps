import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatSort } from '@angular/material/sort';
import { PsmJSON, PsmObject } from '../../model/tableobjects';
import { MpaTableDataService } from '../../services/mpa-table-data.service';
import {
  PeptideScope,
  PsmScope,
} from '../proteingroup-detail-view/proteingroup-detail-view.component';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-psm-table',
  templateUrl: './psm-table.component.html',
  styleUrls: ['./psm-table.component.css'],
})
export class PsmTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['psmID', 'peptideID', 'spectrumID'];
  dataSource: MatTableDataSource<PsmJSON>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  PsmScope = PsmScope;
  @Input() scope: PsmScope;

  constructor(private mpaTableDataService: MpaTableDataService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    if (this.scope === 0) {
      this.mpaTableDataService.selectedProteinGroup.subscribe(
        (proteinGroup) => {
          this.dataSource.data = proteinGroup.psmList;
        }
      );
    } else if (this.scope === 1) {
      this.mpaTableDataService.psmsForSelectedPeptide.subscribe((psms) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  setPsm(row: PsmObject) {
    this.mpaTableDataService.selectedPsm.next(row);
  }

  highlightRow(row) {
    return this.mpaTableDataService.highlightIfSelected(row);
  }
}
