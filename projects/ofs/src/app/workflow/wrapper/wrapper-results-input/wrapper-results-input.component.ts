import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { Feature, FeatureProfile } from '../../models/classifier.model';
import { WorkflowService } from '../../services/workflow.service';
import { Endpoints } from '../../../models/endpoints.model';

@Component({
  selector: 'ofs-wrapper-results-input',
  templateUrl: './wrapper-results-input.component.html',
  styleUrls: ['./wrapper-results-input.component.scss'],
})
export class WrapperResultsInputComponent implements OnInit, AfterViewInit {
  // listOfFeatures: Feature[] = [
  //   { featureId: 'feature1' },
  //   { featureId: 'feature2' },
  //   { featureId: 'feature3' },
  //   { featureId: 'feature4' },
  //   { featureId: 'feature5' },
  //   { featureId: 'feature6' },
  //   { featureId: 'feature7' },
  //   { featureId: 'feature8' },
  //   { featureId: 'feature9' },
  //   { featureId: 'feature10' },
  //   { featureId: 'feature11' },
  //   { featureId: 'feature12' },
  // ];
  // listOfFeatureProfiles: FeatureProfile[] = [
  //   {
  //     profileId: 'profile1',
  //     features: [{ featureId: 'feature1' }, { featureId: 'feature2' }],
  //   },
  //   {
  //     profileId: 'profile2',
  //     features: [
  //       { featureId: 'feature3' },
  //       { featureId: 'feature4' },
  //       { featureId: 'feature5' },
  //       { featureId: 'feature6' },
  //       { featureId: 'feature7' },
  //     ],
  //   },
  //   {
  //     profileId: 'profile3',
  //     features: [
  //       { featureId: 'feature7' },
  //       { featureId: 'feature8' },
  //       { featureId: 'feature9' },
  //       { featureId: 'feature10' },
  //       { featureId: 'feature11' },
  //       { featureId: 'feature12' },
  //     ],
  //   },
  // ];

  displayedColumns: string[] = ['select', 'featureID'];
  dataSource = new MatTableDataSource<Feature>();
  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  profileSelection: FormControl = new FormControl<FeatureProfile>(null);

  constructor(private workflow: WorkflowService) {}

  get listOfFeatureProfiles() {
    return this.workflow.ofsData.responseData.wrapperResponse
      .featureSelectionProfiles;
  }

  ngOnInit(): void {
    this.workflow.featureSubject.subscribe((features) => {
      this.dataSource.data = features
    })
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
    const selectedFeatures = this.dataSource.data.filter((feature) =>
      this.selection.selected.includes(feature.featureID)
    );
    this.workflow.submitConfig({selectedFeatures: selectedFeatures}, Endpoints.CLASSIFIER_INPUT);
  }
}
