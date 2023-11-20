import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserInputService} from './user-input.service';
import { catchError, retry } from 'rxjs/operators';
import * as uuid from 'uuid';

// write config file
// get status

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private rh: string;
  private nr: string;
  resultLink = '';
  status = '';
  private myId = uuid.v4();
  private url = 'https://tax2proteome.de/api/write_config.php';
  private url2 = 'https://tax2proteome.de/api/get.php';

  constructor(
      private http: HttpClient,
      private userInService: UserInputService,
      ) { }
  
  private handleError(error: HttpErrorResponse){
    if (error.status === 0){
      //  A client-side or network error occurred. 
      console.error(
        `Network Error: `, error.error);
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('An network error occurred.')); 
    }
    else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('An backend error occurred for API request.'));                
  }

  getConfig<T>(): Observable<string> {
    if (this.userInService.selectedDatabase === 'NCBI-nr' && this.userInService.selectedHeader === 'reduced headers'){
      this.rh = '1'; } else {this.rh = '0'; }
    if (this.userInService.selectedDatabase !== 'NCBI-nr' && this.userInService.selectedRedundant === 'non-redundant'){
      this.nr = '1'; } else{this.nr = '0'; }
    const taxa: number[] = [];
    this.userInService.selectedTaxa.forEach((entry) => {
            taxa.push(entry.taxid);
    });
    let params = new HttpParams();
    if (taxa.length > 0) {
      params = params.set('id', taxa.toString());
    }
    if (this.userInService.selectedDatabase === 'NCBI-nr'){
      params = params.set('db', 'ncbi');
    }
    else{
      params = params.set('db', this.userInService.selectedDatabase.toLowerCase().toString());
    }
    params = params.set('rank', this.userInService.selectedRank.toLowerCase().toString());
    params = params.set('nr', this.nr.toString());
    params = params.set('rh', this.rh.toString());
    params = params.set('uid', this.myId.toString());
    const urlQuery = `${this.url}?${params.toString()}`;
    return this.http
      .get(urlQuery, {responseType: 'text'})
      .pipe(
      retry(3),
        catchError(this.handleError)
      ); 
    }

  async generateConfig(){
    try {
      this.resultLink = await this.getConfig().toPromise();
    }
    catch (e){
      console.log('error: ', e);
      // handle exception
    }
  }

  getProgress2<T>(dbId): Observable<string> {
    let params = new HttpParams();
    params = params.set('db_id', dbId);
    const urlQuery = `${this.url2}?${params.toString()}`;
    return this.http
    .get(urlQuery, {responseType: 'text'})
    .pipe(
     retry(3),
      catchError(this.handleError)
    )
  }

  async getProgress(dbId){
    try {
      this.status = await this.getProgress2(dbId).toPromise();
    }
    catch (e){
      console.log('error: ', e);
      // handle exception
    }
  }
}
