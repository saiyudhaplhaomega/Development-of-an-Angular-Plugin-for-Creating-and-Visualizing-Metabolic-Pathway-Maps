import { Injectable } from '@angular/core';
import { GroupingOptions, PeptideObject, ProteinGroupObject, ProteinObject, ProteinSequenceObject, PsmObject, SpectrumObject } from '../objects/tableobjects';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClientService } from '../../core/services/http-client.service';
import { Endpoints } from '../../core/services/webserveraddress.service';
import { HttpParams } from '@angular/common/http';
import { spectraMockData1, spectraMockData2 } from '../components/spectrum-viewer/mockData';
import { SpectrumDataObject } from '../components/spectrum-viewer/spectrum-data-object';
import { ProteinGroupRequest } from '../components/experiment-page/experiment-page.component';
import { createProteinGroupData } from './dummyProteinData';

export enum GroupSelection {
  MAINGROUPS = 'maingroups',
  SUBGROUPS = 'subgroups',
  HIERARCHICAL = 'hierarchical',
}

export enum TaxonomyDisplaySelection {
  HIERARCHICAL = 'hierarchical',
  FLAT = 'flat'
}

@Injectable({
  providedIn: 'root'
})
export class MpaTableDataService {

  private mpaData: ProteinGroupObject[];

  public mpaTableData = new BehaviorSubject<ProteinGroupObject[]>([]);

  public selectedProteinGroup = new BehaviorSubject<ProteinGroupObject>(undefined);
  public selectedProtein = new BehaviorSubject<ProteinObject>(undefined);
  public peptidesForSelectedProtein = new BehaviorSubject<PeptideObject[]>([]);
  public psmsForSelectedPeptide = new BehaviorSubject<PsmObject[]>([]);

  public selectedPeptide = new BehaviorSubject<PeptideObject>(undefined);
  public selectedPsm = new BehaviorSubject<PsmObject>(undefined);

  public spectrumData = new BehaviorSubject<SpectrumObject>(undefined);
  public expID = new BehaviorSubject<string>(undefined)

  public requestingSpectrum = new Subject<boolean>();

  public proteinSequenceData = new BehaviorSubject<ProteinSequenceObject>(undefined);
  public requestingProteinSequence = false;

  public groupSelection: GroupSelection = GroupSelection.MAINGROUPS;

  public taxonomyDisplaySelection = TaxonomyDisplaySelection.FLAT;

  // initialize BehaviorSubject with new, empty SpectrumDataObject
  public spectrumDataObject$: BehaviorSubject<SpectrumDataObject>

  constructor(private httpClientService: HttpClientService) {
    this.requestingSpectrum.next(true);
    this.selectedProtein.subscribe(protein => {
      if (typeof protein !== 'undefined') {
        this.setPeptidesForSelectedProtein();
        this.requestSequence();
      }
    });

    this.selectedPeptide.subscribe(peptide => {
      if (typeof peptide !== 'undefined') {
        this.setPsmsForSelectedPeptide();
      }
    });

    this.selectedPsm.subscribe(psm => {
      if (typeof psm !== 'undefined') {
        this.requestSpectrum();
      }
    });
    this.spectrumDataObject$ = new BehaviorSubject<SpectrumDataObject>(new SpectrumDataObject([], ''));
  }

  public requestProteinGroups() {
    this.httpClientService.postObject<ProteinGroupRequest, ProteinGroupObject[]>({
      filename: 'sample.mgf', //sinnlos?
      experimentID: this.expID.value,
    }, Endpoints.GET_PROTEIN_GROUPS).subscribe({
      next: (proteinGroups) => {

        //TODO display testing
        proteinGroups.map(group => {
          group.isDisplayed = true;
          group.proteinSubGroupList.map(subgroup => {
            subgroup.isDisplayed = true;
          })
        })

        this.setMpaData(proteinGroups);
      },
      error: () => {
        // TODO: THIS IS THE DUMMY DATA:
        const proteinGroups = createProteinGroupData('', GroupingOptions.OCCAM, {
          numberOfMainGroups: 100, subGroupsPerMainGroup: 2
        });
        console.log('ERROR: mpa-table-data.service.requestProteinGroups')
        this.setMpaData(proteinGroups);
      }
    });
  }

  private requestSequence() {
    const params: HttpParams = new HttpParams(
      {
        fromObject: {
          userID: 'sample.mgf', //userID sinnlos
          experimentID: this.expID.value,
          proteinid: this.selectedProtein.value.proteinID
        }
      });
    this.requestingProteinSequence = true;
    this.httpClientService.getObject<ProteinSequenceObject>(Endpoints.GET_PROTEIN_SEQUENCE, params).subscribe({
      next: (proteinSequence) => {
        this.proteinSequenceData.next(proteinSequence);
        this.requestingProteinSequence = false;
      },
      error: () => {
        this.proteinSequenceData.next({ proteinID: Math.random().toString(36).substring(7), sequence: Math.random().toString(36).substring(7) });
        console.log('ERRRORR...');
        this.requestingProteinSequence = false;
      }
    });
  }

  private i = 0;

  private requestSpectrum() {
    this.requestingSpectrum.next(true);
    const params: HttpParams = new HttpParams(
      {
        fromObject: {
          //TODO change to fileid
          fileid: this.expID.value,
          spectrumid: this.selectedPsm.value.spectrumID
        }
      });
    this.httpClientService.getObject<SpectrumObject>(Endpoints.GET_SPECTRUMDATA, params).subscribe({
      next: (spectrumObj) => {
        let spectrumDataObj = new SpectrumDataObject(spectrumObj.peakArray, spectrumObj.peptideSequence);
        this.spectrumDataObject$.next(spectrumDataObj);
        this.requestingSpectrum.next(false);
      },
      error: () => {
        // TODO: just using mock data, remove once endpoint works
        this.requestingSpectrum.next(false);
        // if ((this.i % 2) == 0) {
        //   this.spectrumDataObject$.next(new SpectrumDataObject(spectraMockData1.dataPoints, spectraMockData1.peptideSequence));
        // } else if ((this.i % 2) != 0) {
        //   this.spectrumDataObject$.next(new SpectrumDataObject(spectraMockData2.dataPoints, spectraMockData2.peptideSequence));
        // }
        this.i++;
      }
    })
  }

  emptySpectrumData() {
    this.spectrumDataObject$.next(new SpectrumDataObject([], ''))
  }

  setMpaData(mpaData: ProteinGroupObject[]) {
    //sort data after receiving it from back-end, set sorted data as this.mpaData
    mpaData.sort((a, b) => {
      return parseInt(a.proteinGroupID) - parseInt(b.proteinGroupID);
    })
    mpaData.map(group => {
      group.proteinSubGroupList.sort((a, b) => {
        let aString = a.proteinSubGroupID.split("_");
        let bString = b.proteinSubGroupID.split("_");
        let returnValue = parseInt(aString[0]) - parseInt(bString[0]);
        if (returnValue == 0) {
          returnValue = parseInt(aString[1]) - parseInt(bString[1]);
        }
        return returnValue;
      })
    })
    this.mpaData = mpaData;
    this.setMpaTabledata(this.groupSelection);
  }

  setPeptidesForSelectedProtein() {
    this.peptidesForSelectedProtein.next(this.selectedProteinGroup.value.peptideList.filter(
      peptide => this.selectedProtein.value.peptideNodes.includes(peptide.sequenceID)));
  }

  setPsmsForSelectedPeptide() {
    this.psmsForSelectedPeptide.next(this.selectedProteinGroup.value.psmList.filter(
      psm => psm.peptideID === this.selectedPeptide.value.sequenceID));
  }

  highlightIfSelected(row: ProteinGroupObject | ProteinGroupObject | ProteinObject | PeptideObject | PsmObject): boolean {

    if ('proteinGroupID' in row) {
      return this.selectedProteinGroup.value && row.proteinGroupID === this.selectedProteinGroup.value.proteinGroupID;
    }

    if ('proteinSubGroupID' in row) {
      return this.selectedProteinGroup.value && row.proteinSubGroupID === this.selectedProteinGroup.value.proteinSubGroupID;
    }

    if ('proteinID' in row) {
      return this.selectedProtein.value && row.proteinID === this.selectedProtein.value.proteinID;
    }

    if ('sequenceID' in row) {
      return this.selectedPeptide.value && row.sequenceID === this.selectedPeptide.value.sequenceID;
    }

    if ('psmID' in row) {
      return this.selectedPsm.value && row.psmID === this.selectedPsm.value.psmID;
    }

    return false;
  }

  resetCompleteSelection() {
    this.selectedProtein.next(undefined);
    this.selectedPeptide.next(undefined);
    this.selectedPsm.next(undefined);
    this.peptidesForSelectedProtein.next([]);
    this.psmsForSelectedPeptide.next([]);
  }

  //uses sorted mpaData to set mpaTableData based on groupSelection and if the group is set to be displayed
  setMpaTabledata(groupSelection: GroupSelection) {
    let newtableData: ProteinGroupObject[];
    if (groupSelection == GroupSelection.SUBGROUPS) {
      let subgroups: ProteinGroupObject[] = [];
      this.mpaData.map(group => group.proteinSubGroupList.map(subgroup => ('proteinSubGroupID' in subgroup && subgroup.isDisplayed) ? subgroups.push(subgroup) : {}));
      newtableData = subgroups;
    }
    else {
      newtableData = this.mpaData.filter(group => 'proteinSubGroupList' in group && group.isDisplayed);
      newtableData.map(group => {
        let subgroups: ProteinGroupObject[] = [];
        group.proteinSubGroupList.map(subgroup => {('proteinSubGroupID' in subgroup && subgroup.isDisplayed) ? subgroups.push(subgroup) : {}});
        group.proteinSubGroupList = subgroups;
      })
    }
    this.mpaTableData.next(newtableData);
    this.selectedProteinGroup.next(newtableData[0]);
  }

  onGroupSelection(): void {
    this.setMpaTabledata(this.groupSelection);
  }

  onHideSelectedGroups(): void {
    const tableDataMap = new Map<string, ProteinGroupObject>();
    this.mpaTableData.value.map(group => {
      tableDataMap.set(group.proteinGroupID || group.proteinSubGroupID, group);
      if (this.groupSelection == GroupSelection.HIERARCHICAL) {
        group.proteinSubGroupList.map(subgroup => {
          tableDataMap.set(subgroup.proteinSubGroupID, subgroup);
        })
      }
    })

    this.mpaData.map(group => {
      if (tableDataMap.has(group.proteinGroupID)) {
        group.isDisplayed = !tableDataMap.get(group.proteinGroupID).isSelected;
        group.isSelected = false;
      }
      group.proteinSubGroupList.map(subgroup => {
        if (tableDataMap.has(subgroup.proteinSubGroupID)) {
          subgroup.isDisplayed = !tableDataMap.get(subgroup.proteinSubGroupID).isSelected;
          subgroup.isSelected = false;
        }
      })
    })

    //TODO update ProteinGroups in back-end with new properties
    this.setMpaTabledata(this.groupSelection);
  }

  onResetHiddenGroups(): void {
    this.mpaData.map(group => {
      !group.isDisplayed ? group.isDisplayed = !group.isDisplayed : {};
      group.proteinSubGroupList.map(subgroup => {
        !subgroup.isDisplayed ? subgroup.isDisplayed = !subgroup.isDisplayed : {};
      })
    })

    //TODO update ProteinGroups in back-end with new properties
    this.setMpaTabledata(this.groupSelection);
  }

downloadProteinTableData(): void {
  this.httpClientService.postObject<{ experimentID: string, groupSelection: GroupSelection }, { message: string; }>({
    experimentID: this.expID.value,
    groupSelection: this.groupSelection
  }, Endpoints.GET_DOWNLOADPROTEINGROUPS).subscribe({
    next: (json) => {
      console.log(json)
      this.onSaveFile("proteinGroupsReport", json.message, "text/csv;charset=utf-8")
    },
    error: () => {
      console.log('ERROR: mpa-table-data.service.downloadProteinTableData')
    }
  });
}

onSaveFile(fileName: string, fileContent, fileType): void {
  const file = new Blob([fileContent], { type: fileType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  link.click();
  link.remove();
}

}
