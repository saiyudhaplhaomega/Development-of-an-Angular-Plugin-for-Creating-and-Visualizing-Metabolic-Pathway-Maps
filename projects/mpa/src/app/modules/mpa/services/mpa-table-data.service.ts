import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'dist/shared-lib';
import { BehaviorSubject, Subject } from 'rxjs';
import { Endpoints, WebserveraddressService } from '../../../mpawebserveraddress.service';
import { ProteinGroupRequest } from '../components/experiment-page/experiment-page.component';
import { SpectrumDataObject } from '../components/spectrum-viewer/spectrum-data-object';
import { PeptideObject, ProteinGroupObject, ProteinObject, ProteinSequenceObject, PsmObject, SpectrumObject } from '../model/tableobjects';

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

  constructor(
    private httpClientService: HttpClientService,
    private addressService: WebserveraddressService) {
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
    }, this.addressService.getEndpoint(Endpoints.GET_PROTEIN_GROUPS)).subscribe({
      next: (proteinGroups) => {
        // proteinGroups.sort((a, b) => {
        //   return parseInt(a.proteinGroupID) - parseInt(b.proteinGroupID);
        // })
        // proteinGroups.map(group => {
        //   group.proteinSubGroupList.sort((a, b) => {
        //     let aString = a.proteinGroupID.split("_");
        //     let bString = b.proteinGroupID.split("_");
        //     let returnValue = parseInt(aString[0]) - parseInt(bString[0]);
        //     if (returnValue == 0) {
        //       returnValue = parseInt(aString[1]) - parseInt(bString[1]);
        //     }
        //     return returnValue;
        //   })
        // })
        this.mpaData = proteinGroups;
        this.setMpaTabledata();
      },
      error: () => {
        console.log('ERROR: mpa-table-data.service.requestProteinGroups')
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
    this.httpClientService.getObject<ProteinSequenceObject>(this.addressService.getEndpoint(Endpoints.GET_PROTEIN_SEQUENCE), params).subscribe({
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
    this.httpClientService.getObject<SpectrumObject>(this.addressService.getEndpoint(Endpoints.GET_SPECTRUMDATA), params).subscribe({
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
  setMpaTabledata() {
    let newTableData: ProteinGroupObject[];
    if (this.groupSelection == GroupSelection.SUBGROUPS) {
      let subgroups: ProteinGroupObject[] = [];
      this.mpaData.map(group => group.proteinSubGroupList.map(subgroup => subgroups.push(subgroup)));
      newTableData = subgroups;
    }
    else {
      newTableData = this.mpaData.filter(group => group.proteinSubGroupList)
    }
    //TODO sort newTableData
    newTableData = this.sortTableData(newTableData);
    console.log(newTableData)
    this.mpaTableData.next(newTableData);
    this.selectedProteinGroup.next(newTableData[0]);
  }

  sortTableData(tableData: ProteinGroupObject[]): ProteinGroupObject[] {
    let disabledGroups: ProteinGroupObject[] = [];
    let enabledGroups: ProteinGroupObject[] = [];

    tableData.sort((a, b) => {
      return parseInt(a.proteinGroupID) - parseInt(b.proteinGroupID);
    })
    tableData.map(group => {
      group.proteinSubGroupList.sort((a, b) => {
        let aString = a.proteinGroupID.split("_");
        let bString = b.proteinGroupID.split("_");
        let returnValue = parseInt(aString[0]) - parseInt(bString[0]);
        if (returnValue == 0) {
          returnValue = parseInt(aString[1]) - parseInt(bString[1]);
        }
        return returnValue;
      })
      let disabledSubGroups: ProteinGroupObject[] = [];
      let enabledSubGroups: ProteinGroupObject[] = [];
      group.proteinSubGroupList.map(subgroup => {
        subgroup.hidden ? disabledSubGroups.push(subgroup) : enabledSubGroups.push(subgroup);
      })
      group.proteinSubGroupList = [...enabledSubGroups,...disabledSubGroups];
      group.hidden ? disabledGroups.push(group) : enabledGroups.push(group);
    })
    let groups = [...enabledGroups,...disabledGroups];
    console.log(groups)
    return groups;
  }

  onGroupSelection(): void {
    this.setMpaTabledata();
  }

  onToggleDisableGroup(isDisableAction: boolean) {
    // get proteinGroups, put into Map with id as key for easier access while mapping this.mpaData
    //TODO this map might not be neccessary anymore
    const tableDataMap = new Map<string, ProteinGroupObject>();
    this.mpaTableData.value.map(group => {
      tableDataMap.set(group.proteinGroupID, group);
      if (this.groupSelection == GroupSelection.HIERARCHICAL) {
        group.proteinSubGroupList.map(subgroup => {
          tableDataMap.set(subgroup.proteinGroupID, subgroup);
        })
      }
    })

    let groupsToUpdate: ProteinGroupObject[] = [];
    this.mpaData.map(group => {
      if (tableDataMap.get(group.proteinGroupID)) {
        group.hidden = (isDisableAction && tableDataMap.get(group.proteinGroupID).isSelected) ? true : false;
        if (tableDataMap.get(group.proteinGroupID).isSelected) {
          let strippedGroup = new ProteinGroupObject;
          strippedGroup.experimentID = group.experimentID;
          strippedGroup.proteinGroupID = group.proteinGroupID;
          strippedGroup.hidden = group.hidden;
          strippedGroup.groupType = group.groupType;
          groupsToUpdate.push(strippedGroup);
        }
        group.isSelected = false;
      }
      group.proteinSubGroupList.map(subgroup => {
        if (tableDataMap.has(subgroup.proteinGroupID)) {
          subgroup.hidden = (isDisableAction && tableDataMap.get(subgroup.proteinGroupID).isSelected) ? true : false;
          if(subgroup.hidden) {
            let strippedSubGroup = new ProteinGroupObject;
            strippedSubGroup.experimentID = subgroup.experimentID;
            strippedSubGroup.proteinGroupID = subgroup.proteinGroupID;
            strippedSubGroup.groupType = subgroup.groupType;
            strippedSubGroup.hidden = subgroup.hidden;
            groupsToUpdate.push(strippedSubGroup);
          }
          subgroup.isSelected = false;
        }
      })
    })

    this.setMpaTabledata();
    this.httpClientService.postObject<ProteinGroupObject[],any>(groupsToUpdate,this.addressService.getEndpoint(Endpoints.POST_UPDATE_PROTEIN_GROUPS)).subscribe()
  }

  downloadProteinTableData(): void {
    this.httpClientService.postObject<{ experimentID: string, groupSelection: GroupSelection }, { message: string; }>({
      experimentID: this.expID.value,
      groupSelection: this.groupSelection
    }, this.addressService.getEndpoint(Endpoints.GET_DOWNLOADPROTEINGROUPS)).subscribe({
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
