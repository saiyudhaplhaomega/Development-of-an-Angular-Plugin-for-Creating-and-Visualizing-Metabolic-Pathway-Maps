import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  OnInit,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { PeptideJSON } from '../../model/tableobjects';
import { MpaTableDataService } from '../../services/mpa-table-data.service';
import { PeptideScope } from '../proteingroup-detail-view/proteingroup-detail-view.component';

@Component({
  selector: 'app-peptide-table',
  templateUrl: './peptide-table.component.html',
  styleUrls: ['./peptide-table.component.css'],
})
export class PeptideTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id'];
  dataSource: MatTableDataSource<PeptideJSON>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() scope: PeptideScope;

  constructor(private mpaTableDataService: MpaTableDataService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    if (this.scope === 0) {
      this.mpaTableDataService.selectedProteinGroup.subscribe(
        (proteinGroup) => {
          this.dataSource.data = proteinGroup.peptideList;
        }
      );
    } else if (this.scope === 1) {
      this.mpaTableDataService.peptidesForSelectedProtein.subscribe(
        (peptides) => {
          this.dataSource.data = peptides;
        }
      );
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
  }

  setPeptide(peptide: PeptideJSON) {
    this.mpaTableDataService.selectedPeptide.next(peptide);
  }

  highlightRow(row) {
    return this.mpaTableDataService.highlightIfSelected(row);
  }
}
