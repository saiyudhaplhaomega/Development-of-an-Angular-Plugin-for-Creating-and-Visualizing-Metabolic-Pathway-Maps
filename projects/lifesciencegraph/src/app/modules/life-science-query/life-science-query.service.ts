import { Injectable } from '@angular/core';
import { HttpClientService } from 'shared-lib';
import { QueryJson } from './model/query-json';
import { Endpoints, WebserveraddressService } from '../../lifesciencewebserveraddress.service';

@Injectable({
  providedIn: 'root',
})
export class LifeScienceQueryService {

  constructor(private http: HttpClientService, private adresses: WebserveraddressService) {}

  submitQuery(query: string): void {
    const queryJson: QueryJson = {queryString: query, queryResult: ''};
    this.http.postObject<QueryJson, QueryJson>(queryJson, this.adresses.getEndpoint(Endpoints.QUERY)).subscribe((result) => {
      console.log(result.queryResult);
    });
  }

}
