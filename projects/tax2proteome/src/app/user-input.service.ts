import {EventEmitter, Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

// tax data objects, and other options, tax level order
// ranked taxa to set, add taxa, send taxa emitter to table (in add_taxa and set_to_set)

export interface TaxData {
  taxid: number;
  name: string;
  rank: string;
}

export interface TaxIDData {
  taxid: number;
  name: string;
  rank: string;
  parentid: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserInputService {
  myControl = new FormControl();
  // selectedTaxa:TaxData[] = [{ taxid: 22, name: "zwei", rank: "no rank" }];
  selectedTaxa: TaxData[] = [];
  rankedTaxa: TaxIDData[] = [];
  // if rank selected, taxa in table differ from selected taxa
  shownTaxa: TaxData[] = [];
  taxaEmitter = new EventEmitter<TaxData[]>();
  selectedDatabase = 'Uniprot';
  selectedRank = 'species';
  selectedHeader = 'reduced headers';
  selectedRedundant = 'non-redundant';
  databases: string[] = ['Uniprot', 'NCBI-nr', 'Swissprot'];
  ranks: string[] = ['species', 'genus', 'family', 'order', 'class', 'phylum', 'kingdom', `superkingdom`];
  redundantOptions: string[] = ['non-redundant', 'redundant'];
  headerOptions: string[] = ['reduced headers', 'full headers'];
  order: string[] = ['no rank', 'forma', 'serotype',  'serogroup', 'biotype', 'strain', 'genotype', 'isolate', 'morph', 'pathogroup',
    'clade', 'subvariety', 'forma specialis', 'varietas', 'subspecies', 'species', 'species subgroup', 'species group',
    'series', 'subsection', 'section', 'subgenus', 'genus', 'subtribe', 'tribe', 'subfamily', 'family', 'superfamily',
    'parvorder', 'infraorder', 'suborder', 'order', 'superorder', 'subcohort', 'cohort', 'infraclass', 'subclass',
    'class', 'superclass', 'subphylum', 'phylum', 'superphylum', 'subkingdom', 'kingdom', 'superkingdom', 'root'];

  getTaxa() {
    return this.selectedTaxa;
  }

  deleteSelectedTaxIDs(){
    this.selectedTaxa = [];
    return this.selectedTaxa;
  }

  constructor() {
  }

  sendTaxa() {
    this.taxaEmitter.emit(this.shownTaxa);
  }

  addTaxa(taxObject: TaxData): void {
    // no duplicates
    if (this.selectedTaxa.map(a => a.taxid).indexOf(taxObject.taxid) === -1)
    {
      this.selectedTaxa.push(taxObject);
    }
    this.myControl.setValue('');
    this.shownTaxa = this.selectedTaxa;
    this.sendTaxa();
    }

  set_to_set(): void {
    const taxa = this.rankedTaxa;
    this.rankedTaxa = [];
    for (const taxon of taxa) {
      // no duplicates
      if (this.rankedTaxa.map(a => a.taxid).indexOf(taxon.taxid) === -1)
      {
        this.rankedTaxa.push(taxon);
      }
      this.myControl.setValue('');
      this.shownTaxa = this.rankedTaxa;
      this.sendTaxa();
    }
  }
}
