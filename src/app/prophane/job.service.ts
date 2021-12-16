import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ProphaneJobObject} from './objects/prophanejobjson';
import {HttpClientService} from '../core/services/http-client.service';
import {HttpHeaders} from '@angular/common/http';
import {Endpoints} from '../core/services/webserveraddress.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private jsonUpload: HttpClientService) {

  }

  getJobs(): Observable<ProphaneJobObject[]> {
    return this.jsonUpload.postObject<ProphaneJobObject[], ProphaneJobObject[]>([], Endpoints.GET_PROPHANE_JOBS);
  }

  getJob(uuid: string): Observable<ProphaneJobObject> {
     return this.jsonUpload.getObject<ProphaneJobObject>(Endpoints.GET_PROPHANE_JOB + uuid);
  }

  // getWithName<T>(name: string, api: string): Observable<T> {
  //   console.log('IDPROVIDER: ' + this.authGuard.getIdProvider());
  //   httpOptions.headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': this.authGuard.getUserAuthorization()
  //   });
  //   return this.http.get<T>(this.webserver.getwebserverurl() + api + '?name=' + name, httpOptions);
  // }


  requestJob(job: ProphaneJobObject): Observable<ProphaneJobObject> {
    try {
      const observeMe = this.jsonUpload.postObject<ProphaneJobObject, ProphaneJobObject>(job, Endpoints.PROPHANE_REQUEST_JOB);
      console.log(observeMe);
      return observeMe;
    } catch (e) {
      console.log('FAIL');
    }
  }

  saveJob(job: ProphaneJobObject): Observable<ProphaneJobObject> {
    return this.jsonUpload.postObject<ProphaneJobObject, ProphaneJobObject>(job, Endpoints.PROPHANE_SAVE_JOB_FORM);
  }

  addJob(job: ProphaneJobObject): Observable<ProphaneJobObject> {
    return this.jsonUpload.postObject<ProphaneJobObject, ProphaneJobObject>(job, Endpoints.PROPHANE_START_JOB);
  }

  /** DELETE: delete the job from the server */
  deleteJob(jobToDelete: ProphaneJobObject) {
    this.jsonUpload.postObject<ProphaneJobObject, ProphaneJobObject>(jobToDelete, Endpoints.PROPHANE_DELETE_JOB).subscribe(res => {
      console.log('job deleted: ' + jobToDelete.prophaneJobUUID);
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
