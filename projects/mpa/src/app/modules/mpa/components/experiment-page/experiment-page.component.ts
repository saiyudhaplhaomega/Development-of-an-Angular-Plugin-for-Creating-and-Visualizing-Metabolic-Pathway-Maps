import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DataItem } from '../../model/data-item';
import { ProteinGroupObject } from '../../model/tableobjects';
import { MatDialog } from '@angular/material/dialog';
import { TextfieldDialogComponent } from '../textfield-dialog/textfield-dialog.component';
import {
  MpaTableDataService, PGRequestStatus,
} from '../../services/mpa-table-data.service';
import { ContentComponent } from '../../mpa.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CompareExperimentsDialogComponentComponent } from './compare-experiments-dialog/compare-experiments-dialog-component/compare-experiments-dialog-component.component';
import { ExperimentJSONObject } from '../../model/experimentjson';

interface Datstats {
  totalNoProteinGroups: number;
  totalNoProteins: number;
  totalNoPeptides: number;
  totalNoPsms: number;
  totalNoSpectra: number;
}

export interface ProteinGroupRequest {
  filename: string;
  experimentID: string;
}
@Component({
  selector: 'app-experiment-page',
  templateUrl: './experiment-page.component.html',
  styleUrls: ['./experiment-page.component.css'],
})
export class ExperimentPageComponent
  implements OnInit, OnDestroy, ContentComponent {

  PGRequestStatus = PGRequestStatus;
  dataItemOfThisComponent: DataItem;

  displayNameEditing: string;

  datStats: Datstats;

  experimentData: ExperimentJSONObject;
  peaklistFileNode: DataItem;
  searchFileNode: DataItem;

  // ui-related
  selectedTab: number = 0;
  protReqStatus: PGRequestStatus = PGRequestStatus.UNINITIATED;
  hasMpaData: boolean = false;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private mpaTableDataService: MpaTableDataService
  ) {
    this.experimentData = new ExperimentJSONObject();
  }

  ngOnInit() {
    this.mpaTableDataService.expID.next(this.dataItemOfThisComponent.uuid);
    this.displayNameEditing = this.dataItemOfThisComponent.displayName;
    this.mpaTableDataService.proteinGroupRequestStatus.next(PGRequestStatus.UNINITIATED)
    this.mpaTableDataService.proteinGroupRequestStatus.subscribe((status) => {
      this.protReqStatus = status;
      if (this.protReqStatus === PGRequestStatus.INITIATED) {
        this.selectedTab = 1;
      } else if (this.protReqStatus === PGRequestStatus.FULFILLED) {
        this.datStats = this.calculateDataStats();
      }
    })

    this.dataService.getExperimentData(this.dataItemOfThisComponent.uuid).subscribe((experimentData: ExperimentJSONObject) => {
      //TODO translate protDBid and fileIDs to names
      this.experimentData = experimentData;
    });
  }

  ngOnDestroy() {
    //this.updateExperiment();
  }

  /**
   * handles change of display name
   */
  onSetName(): void {
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit experiment name';
    dialogInstance.value = this.dataItemOfThisComponent.displayName;
    dialogInstance.valueLabel = 'name';
    dialogInstance.hasValidators = true;

    dialogRef.beforeClosed().subscribe((expName) => {
      if (expName) {
        this.dataItemOfThisComponent.displayName = expName;
        this.updateExperiment();
      }
    })
  }

  onSetDescription(): void {
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit experiment description';
    dialogInstance.value = this.dataItemOfThisComponent.description;
    dialogInstance.valueLabel = 'description';

    dialogRef.beforeClosed().subscribe((expDescription) => {
      if (expDescription) {
        this.dataItemOfThisComponent.description = expDescription;
        this.updateExperiment();
      }
    });
  }

  updateExperiment(): void {
    if (this.dataItemOfThisComponent.uuid) {
      this.dataService.updateExperiment(this.dataItemOfThisComponent, this.experimentData);
    }
  }

  updateTargetFDR(value: string) {
    if (this.experimentData.targetFdr != value) {
      this.experimentData.targetFdr = value;
      this.updateExperiment();
    }
  }

  onRemoveExperiment(): void {
    this.dataService.removeDataItem(this.dataItemOfThisComponent);
  }

  // TODO move to mpaTableDataService?

  calculateDataStats(): Datstats {
    console.log("calculating stats")
    let mpaData: ProteinGroupObject[] = this.mpaTableDataService.proteinTableData.value;
    let proteinCount = 0;
    let peptideCount = 0;
    let psmCount = 0;
    let spectrumCount = 0;

    for (const group of mpaData) {
      proteinCount += group.proteinList.length;
      peptideCount += group.peptideList.length;
      psmCount += group.psmList.length;
      spectrumCount += group.spectrumIDs.length;
    }

    if (mpaData.length > 0) {
      this.hasMpaData = true;
    } else {
      this.hasMpaData = false;
    }

    return {
      totalNoProteinGroups: mpaData.length,
      totalNoProteins: proteinCount,
      totalNoPeptides: peptideCount,
      totalNoPsms: psmCount,
      totalNoSpectra: spectrumCount,
    };
  }

  onCompareExperiments(): void {
    const parentFolderDataObject: DataItem = this.dataService.getDataItemFromId(this.dataItemOfThisComponent.parent);

    const dialogRef = this.dialog.open(CompareExperimentsDialogComponentComponent, {
      disableClose: true,
      data: { parentFolderDataObject: parentFolderDataObject, expName: this.dataItemOfThisComponent.displayName, expID: this.dataItemOfThisComponent.uuid },
    });
  }

  onDelete(type: string): void {
    // if (type === 'peaklist' && this.hasPeaklistFile) {
    // TODO: this.dataService.removeNode(
    //   this.peaklistFileNode.id, this.id, this.id).subscribe(
    //   del => {
    //     if (del) {
    //       this.hasPeaklistFile = false;
    //       this.peaklistFileNode = undefined;
    //       this.selectedPeaklistFile = undefined;
    //     }
    //   });
    // } else if (type === 'searchFile' && this.hasSearchFile) {
    //TODO this.dataService.removeNode(
    //   this.searchFileNode.id, this.id, this.id).subscribe(
    //   del => {
    //     if (del) {
    //       this.hasSearchFile = false;
    //       this.searchFileNode = undefined;
    //       this.selectedSearchFile = undefined;
    //     }
    //   });
    // }
    //this.getChildNodes();
  }
}
