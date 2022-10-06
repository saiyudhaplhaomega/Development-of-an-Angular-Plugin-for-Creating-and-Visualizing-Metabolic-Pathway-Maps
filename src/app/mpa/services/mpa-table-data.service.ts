import {Injectable} from '@angular/core';
import {PeptideObject, ProteinGroupObject, ProteinObject, PsmObject} from '../objects/tableobjects';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClientService} from '../../core/services/http-client.service';
import {Endpoints} from '../../core/services/webserveraddress.service';
import {HttpParams} from '@angular/common/http';
import {spectraMockData1, spectraMockData2} from '../components/spectrum-viewer/mockData';
import {SpectrumDataObject} from '../components/spectrum-viewer/spectrum-data-object';

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

  public spectrumData = new BehaviorSubject<string>(undefined);

  public requestingSpectrum = new Subject<boolean>();

  public proteinSequenceData = new BehaviorSubject<string>(undefined);
  public requestingProteinSequence = false;

  public groupSelection = 'maingroups';

  // initialize BehaviorSubject with new, empty SpectrumDataObject
  public spectrumDataObject$: BehaviorSubject<SpectrumDataObject>

  constructor(httpClientService: HttpClientService) {
    this.requestingSpectrum.next(true);
    this.selectedProtein.subscribe(protein => {
      if (typeof protein !== 'undefined') {
        this.setPeptidesForSelectedProtein();
        this.requestSequence(httpClientService);
      }
    });

    this.selectedPeptide.subscribe(peptide => {
      if (typeof peptide !== 'undefined') {
        this.setPsmsForSelectedPeptide();
      }
    });

    this.selectedPsm.subscribe(psm => {
      if (typeof psm !== 'undefined') {
        this.requestSpectrum(httpClientService);
      }
    });
    this.spectrumDataObject$ = new BehaviorSubject<SpectrumDataObject>(new SpectrumDataObject([],''));
  }

  private requestSequence(httpClientService: HttpClientService) {
    const params: HttpParams = new HttpParams(
      {
        fromObject: {
          userID: 'sample.mgf',
          experimentID: '67ede406-4b7c-11ec-81d3-0242ac130003',
          peptideID: this.selectedProtein.value.proteinID
        }
      });
    this.requestingProteinSequence = true;
    httpClientService.getObject<string>(Endpoints.UNIMPLEMENTED, params).subscribe(proteinSequence => {
        this.proteinSequenceData.next(proteinSequence);
        this.requestingProteinSequence = false;
      },
      error => {
        this.proteinSequenceData.next(Math.random().toString(36).substring(7));
        console.log('ERRRORR...');
        this.requestingProteinSequence = false;
      });
  }

  private i = 0;

  private requestSpectrum(httpClientService: HttpClientService) {

    // TODO: just using mock data, remove once endpoint works
    this.requestingSpectrum.next(false);
    if ((this.i % 2) == 0) {
      this.spectrumDataObject$.next(new SpectrumDataObject(spectraMockData1.dataPoints,spectraMockData1.peptideSequence));
    } else if ((this.i % 2) != 0) {
      this.spectrumDataObject$.next(new SpectrumDataObject(spectraMockData2.dataPoints,spectraMockData2.peptideSequence));
    }
    this.i++;
    // actual spectrum request
/*    const params: HttpParams = new HttpParams(
      {
        fromObject: {
          userID: 'sample.mgf',
          experimentID: '67ede406-4b7c-11ec-81d3-0242ac130003',
          spectrumID: this.selectedPsm.value.spectrumID
        }
      });

    httpClientService.getObject<string>(Endpoints.UNIMPLEMENTED, params).subscribe(spectrumData => {
        this.spectrumData.next(spectrumData);
        this.requestingSpectrum = false;
      },
      error => {
        this.spectrumData.next(Math.random().toString(36).substring(7));
        console.log('ERRRORR...');
        this.requestingSpectrum = false;
      });*/
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
        break;
      case GroupSelection.SUBGROUPS:
        //newtableData = this.mpaData.filter(group => 'proteinSubGroupID' in group);
        let subgroups = [];
        this.mpaData.map(group => group.proteinSubGroupList.map(subgroup => ('proteinSubGroupID' in subgroup) ? subgroups.push(subgroup) : {} ));
        newtableData = subgroups;
        break;
      case GroupSelection.HIERARCHICAL:
        newtableData = this.mpaData;
    }

    this.mpaTableData.next(newtableData);
    this.selectedProteinGroup.next(newtableData[0]);
  }

  onGroupSelection() {
    this.setMpaTabledata(this.groupSelection);
  }
}
