import { Component, OnInit } from '@angular/core';
import {
  databaseOptions,
  defaultAnnotationTasks,
  evalueOptions,
  optionStrings,
  prophaneReportStyles,
  quantdata,
  lcaParams,
  lcaOptions,
} from '../../prophane/objects/prophaneFormData';
import {Observable} from 'rxjs';
import {ProphaneJobObject} from '../../prophane/objects/prophanejobjson';
import {Endpoints, WebserveraddressService } from 'projects/mpa/src/app/core/services/webserveraddress.service';
import {HttpClientService, MultiFileUploadData } from 'projects/mpa/src/app/core/services/http-client.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './prophane-tutorial.component.html',
  styleUrls: ['./prophane-tutorial.component.css']
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
