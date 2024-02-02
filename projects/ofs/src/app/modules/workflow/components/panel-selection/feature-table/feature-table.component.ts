import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Feature, FeatureProfile } from '../../../models/classifier.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { WorkflowService } from '../../../services/workflow.service';
import { StepperService } from '../../../services/stepper.service';

@Component({
  selector: 'ofs-feature-table',
  templateUrl: './feature-table.component.html',
  styleUrls: ['./feature-table.component.scss'],
})
export class FeatureTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'featureID'];
  dataSource = new MatTableDataSource<Feature>();
  selection = new SelectionModel<string>(true, []);

  profileSelection: FormControl = new FormControl<FeatureProfile>(null);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private workflow: WorkflowService,
    private stepper: StepperService
  ) {}

  get listOfFeatureProfiles() {
    return this.workflow.ofsData.responseData.wrapperResponse
      ?.featureSelectionProfiles;
  }

  ngOnInit(): void {
    this.workflow.ofsData$.subscribe((ofsData) => {
      this.dataSource.data =
        ofsData.responseData.wrapperResponse?.featureSelection;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    const profileFeatures = this.dataSource.data.map(
      (feature) => feature.featureID
    );

    this.selection.select(...profileFeatures);
  }

  applyFeatureProfile() {
    if (this.profileSelection.value) {
      const profileFeatures = this.profileSelection.value.features.map(
        (feature) => feature.featureID
      );

      this.selection.select(...profileFeatures);
    }
  }

  generateResults() {
    const selectedFeatures: Feature[] = this.dataSource.data.filter((feature) =>
      this.selection.selected.includes(feature.featureID)
    );
    this.workflow.submitClassifierConfig({
      classifierJobId: '', // TODO: get classifier job id?
      selectedFeatures: selectedFeatures,
    });
  }
}
