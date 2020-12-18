import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ProphaneJobObject} from './objects/prophanejobjson';
import {AuthenticatedSerializableObjectUploaderService} from '../core/services/authenticated-serializable-object-uploader.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private jsonUpload: AuthenticatedSerializableObjectUploaderService) {

  }

  private apiUrl = 'mpacloud/v1';
  private jobListUrl = this.apiUrl + '/prophaneJobList';
  private deleteJobUrl = this.apiUrl + '/prophaneDeleteJob';

  getJobs(): Observable<ProphaneJobObject[]> {
    return this.jsonUpload.postObj<ProphaneJobObject[]>([], this.jobListUrl);
  }

  /** DELETE: delete the job from the server */
  deleteJob(jobToDelete: ProphaneJobObject) {
    this.jsonUpload.postObj<ProphaneJobObject>(jobToDelete, this.deleteJobUrl).subscribe(res => {
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
