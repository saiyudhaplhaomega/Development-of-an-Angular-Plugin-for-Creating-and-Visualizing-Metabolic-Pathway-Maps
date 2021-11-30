import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ProphaneJobObject} from './objects/prophanejobjson';
import {AuthenticatedSerializableObjectUploaderService} from '../core/services/authenticated-serializable-object-uploader.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private jsonUpload: AuthenticatedSerializableObjectUploaderService) {

  }

  private apiUrl = 'mpacloud/v1';

  getJobs(): Observable<ProphaneJobObject[]> {
    return this.jsonUpload.postObj<ProphaneJobObject[]>([], this.apiUrl + '/prophaneJobList');
  }

  getJob(uuid: string): Observable<ProphaneJobObject> {
     return this.jsonUpload.getObj<ProphaneJobObject>(this.apiUrl + '/getJob/' + uuid);
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
      const observeMe = this.jsonUpload.postObj<ProphaneJobObject>(job, this.apiUrl + '/prophaneRequestJob');
      console.log(observeMe);
      return observeMe;
    } catch (e) {
      console.log('FAIL');
    }
  }

  saveJob(job: ProphaneJobObject): Observable<ProphaneJobObject> {
    return this.jsonUpload.postObj<ProphaneJobObject>(job, this.apiUrl + '/prophaneSaveJobForm');
  }

  addJob(job: ProphaneJobObject): Observable<ProphaneJobObject> {
    return this.jsonUpload.postObj<ProphaneJobObject>(job, this.apiUrl + '/prophaneStartJob');
  }

  /** DELETE: delete the job from the server */
  deleteJob(jobToDelete: ProphaneJobObject) {
    this.jsonUpload.postObj<ProphaneJobObject>(jobToDelete, this.apiUrl + '/prophaneDeleteJob').subscribe(res => {
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
