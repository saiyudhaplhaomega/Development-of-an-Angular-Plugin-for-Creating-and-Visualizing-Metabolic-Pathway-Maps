import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'dist/shared-lib';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

export enum PGRequestStatus {
  UNINITIATED = 'uninitiated',
  INITIATED = 'initiated',
  FULFILLED = 'fulfilled',
  FAILED = 'failed',
}

@Injectable({
  providedIn: 'root'
})
export class MpaTableDataService {

  // used to save ExperimentIDs, ProteinGroupObject[], qValues as to prevent constant requests to the database; minimizes loadtime after initial loading
  private maxNumSaved: number = 5;
  private savedMpaDataMap: Map<string, {targetFdr:string,protGroups:ProteinGroupObject[]}> = new Map<string, {targetFdr:string,protGroups:ProteinGroupObject[]}>();
  private savedExpIds: string[] = [];

  public mpaTableData = new BehaviorSubject<ProteinGroupObject[]>([]);

  public selectedProteinGroup = new BehaviorSubject<ProteinGroupObject>(undefined);
  public selectedProtein = new BehaviorSubject<ProteinObject>(undefined);
  public peptidesForSelectedProtein = new BehaviorSubject<PeptideObject[]>([]);
  public psmsForSelectedPeptide = new BehaviorSubject<PsmObject[]>([]);

  public proteinGroupRequestStatus = new BehaviorSubject<PGRequestStatus>(PGRequestStatus.UNINITIATED);

  public selectedPeptide = new BehaviorSubject<PeptideObject>(undefined);
  public selectedPsm = new BehaviorSubject<PsmObject>(undefined);

  public spectrumData = new BehaviorSubject<SpectrumObject>(undefined);
  public expID = new BehaviorSubject<string>(undefined);

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

  public requestProteinGroups(targetFdr: string): Observable<boolean> {
    // check if data already saved
    // yes -> set mpaTableData to corresponding entry from savedMpaData
    // no -> check if savedMpaData exceeds size -> delete oldest entry
    this.proteinGroupRequestStatus.next(PGRequestStatus.INITIATED);
    let returnValue: Subject<boolean> = new Subject<boolean>();
    let isStored: boolean = false;

    if (this.savedMpaDataMap.has(this.expID.value)) {
      if (this.savedMpaDataMap.get(this.expID.value).targetFdr === targetFdr) {
        isStored = true;
      } else {
        // if targetFdr doesn't match previously used targetFdr -> delete entry from storage
        this.savedMpaDataMap.delete(this.expID.value);
      }
    }

    if (isStored) {
      // setTimeout() to set returnValue after it is returned asObservable -> enables the subscription to catch on
      console.log("pulled data from storage");
      this.setMpaTabledata();
      setTimeout(() => {
        returnValue.next(true);
        this.proteinGroupRequestStatus.next(PGRequestStatus.FULFILLED);
      }, 500);
    } else {
      // makes sure, not too much data is retained
      //TODO change to check for mb stored?
      if (this.savedExpIds.length >= this.maxNumSaved) {
        this.savedMpaDataMap.delete(this.savedExpIds[0]);
        this.savedExpIds.shift();
      }

      const params: HttpParams = new HttpParams(
        {
          fromObject: {
            experimentid: this.expID.value,
            taskid: targetFdr,
          }
        });

      this.httpClientService.getObject<ProteinGroupObject[]>(this.addressService.getEndpoint(Endpoints.GET_PROTEIN_GROUPS), params).subscribe({
        next: (proteinGroups) => {
          console.log("saved data updated:");
          this.savedExpIds.push(this.expID.value);
          this.savedMpaDataMap.set(this.expID.value,{targetFdr:targetFdr,protGroups:proteinGroups});
          this.setMpaTabledata();
          returnValue.next(true);
        },
        error: () => {
          console.log('ERROR: mpa-table-data.service.requestProteinGroups')
          returnValue.next(false);
        }
      });
    }
    return returnValue.asObservable();
  }

  private requestSequence(): void {
    const params: HttpParams = new HttpParams(
      {
        fromObject: {
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

  private requestSpectrum(): void {
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
        console.log("requestSpectrum for experiment " + this.expID.value + " and spectrum " + this.selectedPsm.value.spectrumID + "failed!");
      }
    })
  }

  private setPeptidesForSelectedProtein(): void {
    this.peptidesForSelectedProtein.next(this.selectedProteinGroup.value.peptideList.filter(
      peptide => this.selectedProtein.value.peptideNodes.includes(peptide.sequenceID)));
  }

  private setPsmsForSelectedPeptide(): void {
    this.psmsForSelectedPeptide.next(this.selectedProteinGroup.value.psmList.filter(
      psm => psm.peptideID === this.selectedPeptide.value.sequenceID));
  }

  private saveFile(fileName: string, fileContent, fileType): void {
    const file = new Blob([fileContent], { type: fileType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove();
  }

  public emptySpectrumData(): void {
    this.spectrumDataObject$.next(new SpectrumDataObject([], ''))
  }

  public highlightIfSelected(row: ProteinGroupObject | ProteinGroupObject | ProteinObject | PeptideObject | PsmObject): boolean {

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

  public resetCompleteSelection(): void {
    this.selectedProtein.next(undefined);
    this.selectedPeptide.next(undefined);
    this.selectedPsm.next(undefined);
    this.peptidesForSelectedProtein.next([]);
    this.psmsForSelectedPeptide.next([]);
  }

  /** uses sorted mpaData to set mpaTableData based on groupSelection and if the group is set to be displayed */
  public setMpaTabledata(): void {
    let mpaData: ProteinGroupObject[] = this.savedMpaDataMap.get(this.expID.value).protGroups;
    let newTableData: ProteinGroupObject[] = [];
    if (this.groupSelection == GroupSelection.SUBGROUPS) {
      mpaData.map(group => group.proteinSubGroupList.map(subgroup => newTableData.push(subgroup)));
    }
    else {
      newTableData = mpaData.filter(group => group.proteinSubGroupList)
    }
    newTableData = this.sortTableData(newTableData);
    this.mpaTableData.next(newTableData);
    this.selectedProteinGroup.next(newTableData[0]);
  }

  private sortTableData(tableData: ProteinGroupObject[]): ProteinGroupObject[] {
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
      group.proteinSubGroupList = [...enabledSubGroups, ...disabledSubGroups];
      group.hidden ? disabledGroups.push(group) : enabledGroups.push(group);
    })
    let groups = [...enabledGroups, ...disabledGroups];
    return groups;
  }

  public onGroupSelection(): void {
    this.setMpaTabledata();
  }

  //updates the 'hidden' property of the selected groups in this.mpaData and sends an update to the back-end and this.mpaTableData
  public onToggleDisableGroup(isDisableAction: boolean): void {
    let groupsToUpdate: ProteinGroupObject[] = [];
    let mpaData: ProteinGroupObject[] = this.savedMpaDataMap.get(this.expID.value).protGroups;
    let targetFdr: string = this.savedMpaDataMap.get(this.expID.value).targetFdr;
    mpaData.map(group => {
      if (group.isSelected) {
        group.hidden = (isDisableAction) ? true : false;
        let strippedGroup = new ProteinGroupObject;
        strippedGroup.experimentID = group.experimentID;
        strippedGroup.proteinGroupID = group.proteinGroupID;
        strippedGroup.hidden = group.hidden;
        strippedGroup.groupType = group.groupType;
        groupsToUpdate.push(strippedGroup);
      }
      group.isSelected = false;
      group.proteinSubGroupList.map(subgroup => {
        if (subgroup.isSelected) {
          subgroup.hidden = (isDisableAction) ? true : false;
          let strippedSubGroup = new ProteinGroupObject;
          strippedSubGroup.experimentID = subgroup.experimentID;
          strippedSubGroup.proteinGroupID = subgroup.proteinGroupID;
          strippedSubGroup.groupType = subgroup.groupType;
          strippedSubGroup.hidden = subgroup.hidden;
          groupsToUpdate.push(strippedSubGroup);
        }
        subgroup.isSelected = false;
      })
    })
    this.savedMpaDataMap.set(this.expID.value, {targetFdr:targetFdr,protGroups:mpaData});
    this.setMpaTabledata();
    this.httpClientService.postObject<ProteinGroupObject[], any>(groupsToUpdate, this.addressService.getEndpoint(Endpoints.POST_UPDATE_PROTEIN_GROUPS)).subscribe({
      next: ans => { }//TODO evaluate answer?
    })
  }

  public downloadProteinTableData(): void {
    this.httpClientService.postObject<{ experimentID: string, groupSelection: GroupSelection, targetFdr: string }, { message: string; }>({
      experimentID: this.expID.value,
      groupSelection: this.groupSelection,
      targetFdr: this.savedMpaDataMap.get(this.expID.value).targetFdr.toString(),
    }, this.addressService.getEndpoint(Endpoints.GET_DOWNLOADPROTEINGROUPS)).subscribe({
      next: (json) => {
        console.log(json)
        this.saveFile("proteinGroupsReport", json.message, "text/csv;charset=utf-8")
      },
      error: () => {
        console.log('ERROR: mpa-table-data.service.downloadProteinTableData')
      }
    });
  }

  public getTargetFdrValue(expID: string): string {
    if (this.savedMpaDataMap.has(expID)) {
      return this.savedMpaDataMap.get(expID).targetFdr.toString();
    } else {
      return "not set";
    }
  }

}
