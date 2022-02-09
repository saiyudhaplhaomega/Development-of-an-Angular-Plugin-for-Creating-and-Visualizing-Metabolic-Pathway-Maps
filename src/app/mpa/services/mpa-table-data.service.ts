import { Injectable } from '@angular/core';
import {
  PeptideJSON,
  PeptideObject,
  ProteinGroupJSON,
  ProteinGroupObject,
  ProteinJSON,
  ProteinObject,
  PsmObject
} from '../objects/tableobjects';
import {BehaviorSubject} from 'rxjs';

interface DataSelection {
  selectedProteinGroup: ProteinGroupObject | undefined;
  selectedProtein: ProteinObject | undefined;
  selectedPeptide: PeptideObject | undefined;
  selectedPsm: PsmObject | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class MpaTableDataService {

  public mpaData: ProteinGroupObject[];

  public selectedProteinGroup = new BehaviorSubject<ProteinGroupObject>(undefined);
  public selectedProtein = new BehaviorSubject<ProteinObject>(undefined);
  public selectedPeptide = new BehaviorSubject<PeptideObject>(undefined);
  public selectedPsm = new BehaviorSubject<PsmObject>(undefined);

  constructor() { }

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
      return this.selectedPeptide.value && row.psmID === this.selectedPsm.value.psmID;
    }

    return false;
  }

  resetSelection() {
  this.selectedProtein.next(undefined);
  this.selectedPeptide.next(undefined);
  this.selectedPsm.next(undefined);
  }
}
