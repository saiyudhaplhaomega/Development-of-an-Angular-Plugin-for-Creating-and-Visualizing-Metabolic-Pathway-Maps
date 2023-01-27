import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { OfsJobState } from '../workflow/services/workflow.service';

@Injectable({
  providedIn: 'root',
})
export class OfsHttpClientService {
  constructor(private http: HttpClient) {}

  dummyHttpGet(api: string, params?: HttpParams): Observable<any> {
    return of({ jobId: 'Käsekuchen', state: OfsJobState.CREATED }).pipe(
      delay(1000)
    );
    // once observable is completed, subscriptions automatically close
    // > also applys to http requests
  }

  dummyHttpPost(api: string, params?: HttpParams): Observable<any> {
    return of({ jobId: 'Käsekuchen', state: OfsJobState.CREATED }).pipe(
      delay(100)
    );
  }
}
