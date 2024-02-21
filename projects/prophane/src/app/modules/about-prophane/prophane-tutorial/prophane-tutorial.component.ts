import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Endpoints} from 'projects/mpa/src/app/mpawebserveraddress.service';
import {HttpClientService} from  'shared-lib';
import { databaseOptions, lcaOptions, lcaParams, quantdata } from '../../../model/prophaneFormData';
import { ProphaneJobObject } from '../../../model/prophanejobjson';

@Component({
  selector: 'app-tutorial',
  templateUrl: './prophane-tutorial.component.html',
  styleUrls: ['./prophane-tutorial.component.scss'],
})

export class ProphaneTutorialComponent{
  readonly quantdata = quantdata;
  readonly LcaMethods = lcaOptions;
  readonly LcaParameter = lcaParams;
  readonly downloadURL = "mfof.thdrs.de"
  readonly TaxonomicDatabases = databaseOptions.filter((x) => x['scope'] === 'Taxonomy') ;
  readonly FunctionalDatabases = databaseOptions.filter((x) => x['scope'] === 'Function') ;
  step = 0;
  constructor(private httpService: HttpClientService) { }

  getTestData():
    Observable<ProphaneJobObject> {
    return this.httpService.getObject(Endpoints.DOWNLOAD_PROPHANE_TEST_DATA);
  }
  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
