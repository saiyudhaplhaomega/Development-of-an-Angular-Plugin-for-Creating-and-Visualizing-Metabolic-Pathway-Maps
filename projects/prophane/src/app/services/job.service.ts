import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProphaneJobObject } from '../model/prophanejobjson';



import { HttpClientService } from 'shared-lib';
import { Endpoints, WebserveraddressService } from '../prophane-webserveraddress.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private jsonUpload: HttpClientService, private address: WebserveraddressService) {}

  getJobs(): Observable<ProphaneJobObject[]> {
    return this.jsonUpload.postObject<ProphaneJobObject[], ProphaneJobObject[]>(
      [],
      this.address.getURL(Endpoints.GET_PROPHANE_JOBS)
    );
  }

  getJob(uuid: string): Observable<ProphaneJobObject> {
    return this.jsonUpload.getObject<ProphaneJobObject>(
      this.address.getURL(Endpoints.GET_PROPHANE_JOB) + "/" + uuid
    );
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
      const observeMe = this.jsonUpload.postObject<
        ProphaneJobObject,
        ProphaneJobObject
      >(job, this.address.getURL(Endpoints.PROPHANE_REQUEST_JOB));
      console.log('request job: ' + observeMe);
      return observeMe;
    } catch (e) {
      console.log('FAIL');
    }
  }

  saveJob(job: ProphaneJobObject): Observable<ProphaneJobObject> {
    return this.jsonUpload.postObject<ProphaneJobObject, ProphaneJobObject>(
      job,
      this.address.getURL(Endpoints.PROPHANE_SAVE_JOB_FORM)
    );
  }


  /** DELETE: delete the job from the server */
  deleteJob(jobToDelete: ProphaneJobObject) {
    this.jsonUpload
      .postObject<ProphaneJobObject, ProphaneJobObject>(
        jobToDelete,
        this.address.getURL(Endpoints.PROPHANE_DELETE_JOB)
      )
      .subscribe((res) => {
        console.log('job deleted: ' + jobToDelete.prophaneJobUUID);
      });
  }

  submitJob(filesToUpload): Observable<HttpEvent<Object>> {
      return this.jsonUpload
      .postMultiPartFilesEvents(filesToUpload, this.address.getURL(Endpoints.PROPHANE_FILEUPLOAD));
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
