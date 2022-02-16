import { Injectable } from '@angular/core';
import {
  PeptideObject,
  ProteinGroupObject,
  ProteinObject,
  PsmObject
} from '../objects/tableobjects';
import {BehaviorSubject} from 'rxjs';
import {HttpClientService} from '../../core/services/http-client.service';
import {Endpoints} from '../../core/services/webserveraddress.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MpaTableDataService {

  public mpaData = new BehaviorSubject<ProteinGroupObject[]>([]);

  public selectedProteinGroup = new BehaviorSubject<ProteinGroupObject>(undefined);
  public selectedProtein = new BehaviorSubject<ProteinObject>(undefined);
  public peptidesForSelectedProtein = new BehaviorSubject<PeptideObject[]>([]);
  public psmsForSelectedPeptide = new BehaviorSubject<PsmObject[]>([]);

  public selectedPeptide = new BehaviorSubject<PeptideObject>(undefined);
  public selectedPsm = new BehaviorSubject<PsmObject>(undefined);

  public spectrumData = new BehaviorSubject<string>(undefined);
  public requestingSpectrum = false;

  public proteinSequenceData = new BehaviorSubject<string>(undefined);
  public requestingProteinSequence = false;

  constructor(httpClientService: HttpClientService) {
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

  private requestSpectrum(httpClientService: HttpClientService) {
    const params: HttpParams = new HttpParams(
      {
        fromObject: {
          userID: 'sample.mgf',
          experimentID: '67ede406-4b7c-11ec-81d3-0242ac130003',
          spectrumID: this.selectedPsm.value.spectrumID
        }
      });
    this.requestingSpectrum = true;
    httpClientService.getObject<string>(Endpoints.UNIMPLEMENTED, params).subscribe(spectrumData => {
        this.spectrumData.next(spectrumData);
        this.requestingSpectrum = false;
      },
      error => {
        this.spectrumData.next(Math.random().toString(36).substring(7));
        console.log('ERRRORR...');
        this.requestingSpectrum = false;
      });
  }

  setMpaData(mpaData: ProteinGroupObject[]) {
    this.mpaData.next(mpaData);
    this.selectedProteinGroup.next(mpaData[0]);
  }

  setPeptidesForSelectedProtein() {
    this.peptidesForSelectedProtein.next(this.selectedProteinGroup.value.peptideList.filter(
      peptide => this.selectedProtein.value.peptideNodes.includes(peptide.id)));
  }

  setPsmsForSelectedPeptide() {
    this.psmsForSelectedPeptide.next(this.selectedProteinGroup.value.psmList.filter(
      psm => psm.peptideID === this.selectedPeptide.value.id));
  }

  highlightIfSelected(row: ProteinGroupObject | ProteinObject | PeptideObject | PsmObject): boolean {

    if ('proteinGroupID' in row) {
      return this.selectedProteinGroup.value && row.proteinGroupID === this.selectedProteinGroup.value.proteinGroupID;
    }

    if ('proteinID' in row) {
      return this.selectedProtein.value && row.proteinID === this.selectedProtein.value.proteinID;
    }

    if ('id' in row) {
      return this.selectedPeptide.value && row.id === this.selectedPeptide.value.id;
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
}
