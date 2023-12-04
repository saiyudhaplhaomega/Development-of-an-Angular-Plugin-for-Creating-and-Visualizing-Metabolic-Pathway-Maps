import { Component, OnInit } from '@angular/core';
import {ProphaneJobStateService} from '../../../../services/prophane-job-state.service';
import {lcaOptions} from '../../../../model/prophaneFormData';
import {ProphaneTaskOptionString} from '../../../../model/prophanetaskoptionstring';
import {lcaParams} from '../../../../model/prophaneFormData';

@Component({
  selector: 'app-job-lca',
  templateUrl: './job-lca.component.html',
  styleUrls: ['./job-lca.component.scss']
})
export class JobLcaComponent implements OnInit {

  readonly lcaTasks = lcaOptions;
  readonly lcaOptionStrings = JSON.parse(JSON.stringify(lcaParams));
  readonly tooltipLcaMethod = 'The "LCA per group" method determines the LCA based on annotations of proteins within a protein group. The "democratic LCA" method selects the annotation that occurs most frequently across all protein groups from each protein group.'
  readonly tooltipThreshold = 'Valid thresholds from 0.1 to 1. A threshold value of 1 returns an LCA only if all annotations of all protein group members share the same annotation; otherwise the LCA is reported as "various". With a threshold value of 0.51, Prophane returns an LCA if more than half of the annotations are the same.'
  readonly tooltipIgnoreUnclassified ='For LCA determination only proteins are used if an annotation was found (excluding "unclassified" annotations)'
  readonly tooltipMinNumb = 'Specify a minimum count of annotations within the annotation lineage that will be taken into account for LCA determination. Caution! This parameter is set for all annotations!'
  formErrorColor = '#f8d7da';
  formInputError = [];
  
  constructor(public prophaneJobState: ProphaneJobStateService) {
    console.log(this.prophaneJobState.currentProphaneJob.parameters.lcaTask)
  }
  
  ngOnInit(): void {
  }

  addFormInputErr(elemid) {
    if (this.formInputError.indexOf(elemid) === -1) {
      this.formInputError.push(elemid);
    }
  }

  removeFormInputErr(elemid) {
    this.formInputError = this.formInputError.filter(id => id !== elemid);
  }

  isValidNumber(val, min, max, elemid) {
    if (val === undefined || isNaN(parseFloat(val)) || (min !== undefined && min > val) 
        || (max !== undefined && max < val)) {
      this.addFormInputErr(elemid);
      return false;
    }     else {
      this.removeFormInputErr(elemid);
      return true;
    }
  }

  isValidInt(value, min, max, elemid) {
    if (value === undefined || !value.match('^-?[0-9]+$') || (min !== undefined && min > value) ||
      (max !== undefined && max < value)) {
      this.addFormInputErr(elemid);
      return false;
    }     else {
      this.removeFormInputErr(elemid);
      return true;
    }
  }

  removeLCAOptionString(removeTask: ProphaneTaskOptionString) {
    this.prophaneJobState.currentProphaneJob.parameters.lcaTask.optionstring = 
    this.prophaneJobState.currentProphaneJob.parameters.
    lcaTask.optionstring.filter(obj => obj !== removeTask);
  }

  getLCAAdvancedOptions(algo: String): ProphaneTaskOptionString[] {
    const returnValue: ProphaneTaskOptionString[]  = [];
    for (const task of this.lcaOptionStrings) {
      if (task.name === algo) {
        task.options.forEach(i => returnValue.push(i));
      }
    }
    return returnValue;
  }

  isAlreadyInLCATask(optionstring: ProphaneTaskOptionString[], option): boolean {
    return optionstring.filter(i => i.param === option.param).length > 0;
  }

}
