import {Injectable} from '@angular/core';
import {GroupingOptions, PeptideObject, ProteinGroupObject, ProteinObject, ProteinSequenceObject, PsmObject, SpectrumObject} from '../objects/tableobjects';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClientService} from '../../core/services/http-client.service';
import {Endpoints} from '../../core/services/webserveraddress.service';
import {HttpParams} from '@angular/common/http';
import {spectraMockData1, spectraMockData2} from '../components/spectrum-viewer/mockData';
import {SpectrumDataObject} from '../components/spectrum-viewer/spectrum-data-object';
import { ProteinGroupRequest } from '../components/experiment-page/experiment-page.component';
import { createProteinGroupData } from './dummyProteinData';

export enum GroupSelection {
  MAINGROUPS = 'maingroups',
  SUBGROUPS = 'subgroups',
  HIERARCHICAL = 'hierarchical'
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

  public groupSelection = 'maingroups';

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
    this.spectrumDataObject$ = new BehaviorSubject<SpectrumDataObject>(new SpectrumDataObject([],''));
  }

  public requestProteinGroups(){
    this.httpClientService.postObject<ProteinGroupRequest, ProteinGroupObject[]>({
      filename: 'sample.mgf', //sinnlos?
      experimentID: this.expID.value
    }, Endpoints.GET_PROTEIN_GROUPS).subscribe({
      next: (proteinGroups) => {
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
        this.proteinSequenceData.next({proteinID: Math.random().toString(36).substring(7), sequence: Math.random().toString(36).substring(7)});
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

    // this.httpClientService.getObject<string>(Endpoints.GET_SPECTRUMDATA, params).subscribe({
    //   next: (spectrumData) => {
    //     this.spectrumData.next(spectrumData);
    //     this.requestingSpectrum.next(false);
    //     console.log(spectrumData);
    //   },
    //   error: () => {
    //     // TODO: just using mock data, remove once endpoint works
    //     this.requestingSpectrum.next(false);
    //     if ((this.i % 2) == 0) {
    //       this.spectrumDataObject$.next(new SpectrumDataObject(spectraMockData1.dataPoints, spectraMockData1.peptideSequence));
    //     } else if ((this.i % 2) != 0) {
    //       this.spectrumDataObject$.next(new SpectrumDataObject(spectraMockData2.dataPoints, spectraMockData2.peptideSequence));
    //     }
    //     this.i++;
    //   }
    // })
    this.httpClientService.getObject<SpectrumObject>(Endpoints.GET_SPECTRUMDATA, params).subscribe({
      next: (spectrumObj) => {
        let spectrumDataObj = new SpectrumDataObject(spectrumObj.peakArray,spectrumObj.peptideSequence);
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

  // TODO: this method might be reusable?
  emptySpectrumData(){
    this.spectrumDataObject$.next(new SpectrumDataObject([],''))
  }


  setMpaData(mpaData: ProteinGroupObject[]) {
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

  setMpaTabledata(groupSelection: string) {
    let newtableData: ProteinGroupObject[];
    switch (groupSelection) {
      case GroupSelection.MAINGROUPS:
        newtableData = this.mpaData.filter(group => 'proteinSubGroupList' in group);
        newtableData.sort((a, b) =>{return parseInt(a.proteinGroupID) - parseInt(b.proteinGroupID);})
        break;
      case GroupSelection.SUBGROUPS:
        //newtableData = this.mpaData.filter(group => 'proteinSubGroupID' in group);
        let subgroups = [];
        this.mpaData.map(group => group.proteinSubGroupList.map(subgroup => ('proteinSubGroupID' in subgroup) ? subgroups.push(subgroup) : {} ));
        newtableData = subgroups;
        //newtableData.sort((a, b) =>{return parseInt(a.proteinSubGroupID) - parseInt(b.proteinSubGroupID);})
        newtableData.sort((a, b) => {
          let aString = a.proteinSubGroupID.split("_");
          let bString = b.proteinSubGroupID.split("_");
          let returnValue = parseInt(aString[0]) - parseInt(bString[0]);
          console.log(returnValue)
          if (returnValue == 0) {
            returnValue = parseInt(aString[1]) - parseInt(bString[1]);
          }
          return returnValue;
        })

        break;
      case GroupSelection.HIERARCHICAL:
        newtableData = this.mpaData;
        newtableData.forEach(maingroup =>
          maingroup.proteinSubGroupList.sort((a, b) => {
            let aString = a.proteinSubGroupID.split("_");
            let bString = b.proteinSubGroupID.split("_");
            let returnValue = parseInt(aString[0]) - parseInt(bString[0]);
            console.log(returnValue)
            if (returnValue == 0) {
              returnValue = parseInt(aString[1]) - parseInt(bString[1]);
            }
            return returnValue;
          })
        )

        newtableData.sort((a, b) =>{return parseInt(a.proteinGroupID) - parseInt(b.proteinGroupID);})
    }

    this.mpaTableData.next(newtableData);
    this.selectedProteinGroup.next(newtableData[0]);
  }

  sortMpaTableData(groupData: ProteinGroupObject[]){
    
  }

  onGroupSelection() {
    this.setMpaTabledata(this.groupSelection);
  }
}
