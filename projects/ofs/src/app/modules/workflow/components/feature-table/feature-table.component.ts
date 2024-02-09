import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Feature, FeatureProfile } from '../../models/classifier.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { WorkflowService } from '../../services/workflow.service';
import { OFSData } from '../../models/ofs-data.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CustomSelectionModel } from '../../models/custom-selection.model';

@Component({
  selector: 'ofs-feature-table',
  templateUrl: './feature-table.component.html',
  styleUrls: ['./feature-table.component.scss'],
})
export class FeatureTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['select', 'featureID'];
  dataSource = new MatTableDataSource<Feature>();
  selection = new CustomSelectionModel();

  profileSelection: FormControl = new FormControl<FeatureProfile>(null);

  public formDisabledSubject$ = new BehaviorSubject<boolean>(false);

  Subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private workflow: WorkflowService) {}

  get listOfFeatureProfiles() {
    return this.workflow.ofsData.responseData.wrapperResponse
      ?.featureSelectionProfiles;
  }

  ngOnInit(): void {
    this.Subscriptions.push(
      this.workflow.ofsData$.subscribe((ofsData) => {
        this.dataSource.data =
          ofsData.responseData.wrapperResponse?.featureSelection;
        this.setExistingFormInput(ofsData);
      })
    );

    this.Subscriptions.push(
      this.formDisabledSubject$.subscribe((change) => {
        this.selection.setSelectionBlocked(change);
      })
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((sub) => sub.unsubscribe());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selection.size;
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

    this.selection.select(profileFeatures);
  }

  applyFeatureProfile() {
    if (this.profileSelection.value) {
      this.selectFeatures(this.profileSelection.value.features);
    }
  }

  selectFeatures(features: Feature[]) {
    const profileFeatures = features.map((feature) => feature.featureID);
    this.selection.select(profileFeatures);
  }

  generateResults() {
    const selectedFeatures: Feature[] = this.dataSource.data.filter((feature) =>
      this.selection.isSelected(feature.featureID)
    );
    this.workflow.submitClassifierConfig({
      classifierJobId: '', // TODO: get classifier job id?
      selectedFeatures: selectedFeatures,
    });
  }

  setExistingFormInput(ofsData: OFSData) {
    const selectedFeatures =
      ofsData.configData.classifierConfig?.selectedFeatures;
    if (selectedFeatures !== undefined) {
      //  yes: update form values and disable changes
      this.profileSelection.patchValue(selectedFeatures);
      this.profileSelection.disable();
      this.selectFeatures(selectedFeatures);
      this.formDisabledSubject$.next(true);
      return;
    }
    // no: allow changes of form
    this.profileSelection.enable();
    this.formDisabledSubject$.next(false);
  }
}
