import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'dist/shared-lib';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Endpoints, WebserveraddressService } from '../../../mpawebserveraddress.service';
import { SpectrumDataObject } from '../components/spectrum-viewer/spectrum-data-object';
import { PeptideObject, ProteinGroupDataObject, ProteinGroupObject, ProteinObject, ProteinSequenceObject, PsmObject, SpectrumObject } from '../model/tableobjects';
import { TaxonomyObject } from '../model/taxonomyjson';
import { KeywordObject } from '../model/keywordjson';

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
  private mpaDataMap: Map<string, ProteinGroupDataObject> = new Map<string, ProteinGroupDataObject>();
  private savedExpIds: string[] = [];

  public expID = new BehaviorSubject<string>(undefined);
  public proteinTableData = new BehaviorSubject<ProteinGroupObject[]>([]);
  public keywordData = new BehaviorSubject<KeywordObject>(new KeywordObject());
  public taxonomyData = new BehaviorSubject<TaxonomyObject>(new TaxonomyObject());
  public proteinSequenceData = new BehaviorSubject<ProteinSequenceObject>(undefined);
  public spectrumData = new BehaviorSubject<SpectrumObject>(undefined);
  public spectrumDataObject$: BehaviorSubject<SpectrumDataObject>

  public selectedPeptide = new BehaviorSubject<PeptideObject>(undefined);
  public selectedPsm = new BehaviorSubject<PsmObject>(undefined);
  public selectedProteinGroup = new BehaviorSubject<ProteinGroupObject>(undefined);
  public selectedProtein = new BehaviorSubject<ProteinObject>(undefined);
  public peptidesForSelectedProtein = new BehaviorSubject<PeptideObject[]>([]);
  public psmsForSelectedPeptide = new BehaviorSubject<PsmObject[]>([]);

  public requestingProteinSequence = false;
  public requestingSpectrum = new Subject<boolean>();
  public proteinGroupRequestStatus = new BehaviorSubject<PGRequestStatus>(PGRequestStatus.UNINITIATED);

  public groupSelection: GroupSelection = GroupSelection.MAINGROUPS;
  public taxonomyDisplaySelection = TaxonomyDisplaySelection.FLAT;

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

    if (this.mpaDataMap.has(this.expID.value)) {
      if (this.mpaDataMap.get(this.expID.value).targetFdr === targetFdr) {
        isStored = true;
      } else {
        this.mpaDataMap.delete(this.expID.value);
      }
    }

    if (isStored) {
      // setTimeout() to set returnValue after it is returned asObservable -> enables the subscription to catch on
      this.setMPAData();
      setTimeout(() => {
        returnValue.next(true);
        this.proteinGroupRequestStatus.next(PGRequestStatus.FULFILLED);
      }, 500);

    } else {
      // makes sure, not too much data is retained
      //TODO change to check for mb stored?
      if (this.savedExpIds.length >= this.maxNumSaved) {
        this.mpaDataMap.delete(this.savedExpIds[0]);
        this.savedExpIds.shift();
      }

      const params: HttpParams = new HttpParams(
        {
          fromObject: {
            experimentid: this.expID.value,
            taskid: targetFdr,
          }
        });

      this.httpClientService.getObject<ProteinGroupDataObject>(this.addressService.getEndpoint(Endpoints.GET_PROTEIN_GROUPS), params).subscribe({
        next: (mpaData) => {
          console.log(mpaData)
          // sort proteinGroups after receiving them -> should expedite sorting at alter stages, as they arrive in random order from the back-end
          let sortedProteinGroups = this.sortProteinTableData(mpaData.proteinGroups);
          mpaData.proteinGroups = sortedProteinGroups;
          this.savedExpIds.push(this.expID.value);
          this.mpaDataMap.set(this.expID.value,mpaData);
          this.setMPAData();
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

  /** sets mpaTableData based on groupSelection and if the group is set to be displayed
   * basically, call this method after modifying any part of the current dataSet
  */
  public setMPAData(): void {
    let proteinTableData: ProteinGroupObject[] = this.mpaDataMap.get(this.expID.value).proteinGroups;
    let newProteinTableData: ProteinGroupObject[] = [];
    if (this.groupSelection == GroupSelection.SUBGROUPS) {
      proteinTableData.map(group => group.proteinSubGroupList.map(subgroup => newProteinTableData.push(subgroup)));
    }
    else {
      newProteinTableData = proteinTableData.filter(group => group.proteinSubGroupList)
    }
    newProteinTableData = this.sortProteinTableData(newProteinTableData);
    this.proteinTableData.next(newProteinTableData);
    this.keywordData.next(this.mpaDataMap.get(this.expID.value).kwRoot);
    this.taxonomyData.next(this.mpaDataMap.get(this.expID.value).taxRoot);
    this.selectedProteinGroup.next(newProteinTableData[0]);
  }

  private sortProteinTableData(tableData: ProteinGroupObject[]): ProteinGroupObject[] {
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
    this.setMPAData();
  }

  //updates the 'hidden' property of the selected groups in this.mpaData and sends an update to the back-end and this.mpaTableData
  public onToggleDisableGroup(isDisableAction: boolean): void {
    let groupsToUpdate: ProteinGroupObject[] = [];
    let mpaData: ProteinGroupDataObject = this.mpaDataMap.get(this.expID.value);
    mpaData.proteinGroups.map(group => {
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
    this.mpaDataMap.set(this.expID.value, mpaData);
    this.setMPAData();
    this.httpClientService.postObject<ProteinGroupObject[], any>(groupsToUpdate, this.addressService.getEndpoint(Endpoints.POST_UPDATE_PROTEIN_GROUPS));
  }

  public downloadProteinTableData(): void {
    this.httpClientService.postObject<{ experimentID: string, groupSelection: GroupSelection, targetFdr: string }, { message: string; }>({
      experimentID: this.expID.value,
      groupSelection: this.groupSelection,
      targetFdr: this.mpaDataMap.get(this.expID.value).targetFdr.toString(),
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
    if (this.mpaDataMap.has(expID)) {
      return this.mpaDataMap.get(expID).targetFdr.toString();
    } else {
      return "not set";
    }
  }

}
