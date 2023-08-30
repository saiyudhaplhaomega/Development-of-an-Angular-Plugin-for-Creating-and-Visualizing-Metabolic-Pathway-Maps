import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import {Endpoints, WebserveraddressService } from 'projects/mpa/src/app/mpawebserveraddress.service';
import {HttpClientService, MultiFileUploadData } from 'projects/mpa/src/app/core/services/http-client.service';
import { databaseOptions, lcaOptions, lcaParams, quantdata } from '../../model/prophaneFormData';
import { ProphaneJobObject } from '../../model/prophanejobjson';

@Component({
  selector: 'app-tutorial',
  templateUrl: './prophane-tutorial.component.html',
  styleUrls: ['./prophane-tutorial.component.scss']
})
export class ProphaneTutorialComponent implements OnInit {
  readonly quantdata = quantdata;
  readonly LcaMethods = lcaOptions;
  readonly LcaParameter = lcaParams;
  readonly downloadURL = "mfof.thdrs.de"
  readonly TaxonomicDatabases = databaseOptions.filter((x) => x['scope'] === 'Taxonomy') ;
  readonly FunctionalDatabases = databaseOptions.filter((x) => x['scope'] === 'Function') ;

  constructor(private httpService: HttpClientService) { }

  ngOnInit(): void {
  }
  getTestData():
    Observable<ProphaneJobObject> {
    return this.httpService.getObject(Endpoints.DOWNLOAD_PROPHANE_TEST_DATA);
  }
}
