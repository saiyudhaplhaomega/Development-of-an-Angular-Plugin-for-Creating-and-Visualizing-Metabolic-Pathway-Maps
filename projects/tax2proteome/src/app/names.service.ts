import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import {UserInputService, TaxData, TaxIDData} from './user-input.service';

// communication with taxid database
// get taxa names --> call add_taxa() in user-input.service (update table, but this do not work)
// or parent taxa IDs
@Injectable()
export class NamesService {

  // db_result: 172.16.103.175
  // private baseUrl = 'https://tax2proteome.de/api/mquery';
  private baseUrl = "http://localhost:8000/tax2proteome/api/mquery"
  //private Url2 = 'https://tax2proteome.de/api/pquery';
  private Url2 = "http://localhost:8000/tax2proteome/api/pquery"

  constructor(
    private http: HttpClient,
    private userInputService: UserInputService,
  ) { }

    private handleError(error: HttpErrorResponse){
        if (error.status === 0){
          //  A client-side or network error occurred. 
          console.error(
            `Network Error: `, error.error);
            // Return an observable with a user-facing error message.
            return throwError(() => new Error('An network error occurred for API request.')); 
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

    
  fetchNames<T>(taxids: number[]) {
      let params = new HttpParams();
      params = params.set('id', taxids.toString());
      console.log(`${this.baseUrl}?${params.toString()}`);
      return this.http
          .get<T>(`${this.baseUrl}?${params.toString()}`)
          .pipe(
           retry(3),
            catchError(this.handleError)
          ); 
  }
  async getNames(taxids: number[]){
      try {
          const receivedData = await this.fetchNames(taxids).toPromise();
          const receivedData2 = receivedData as TaxData[];
          receivedData2.forEach((entry) => {
              entry.name = entry.name.replace(/ *\(taxid:[^)]*\)*/g, '');
              this.userInputService.addTaxa(entry);
              return(entry);
          });
      }
      catch (e){
          console.log('error: ', e);
          // handle exception
      }
  }
  fetchParentIDs<T>(taxids: number[]): Observable<T> {
      let params = new HttpParams();
      params = params.set('id', taxids.toString());
      return this.http
          .get<T>(`${this.Url2}?${params.toString()}`)
          .pipe(
            retry(3),
            catchError(this.handleError)
          );
  }

  async getIDs(taxids: number[]): Promise<TaxIDData[]>{
      try{
          const receivedData = await this.fetchParentIDs(taxids).toPromise();
          const receivedData2 = receivedData as TaxIDData[];
          receivedData2.forEach((entry) => {
              entry.name = entry.name.replace(/ *\(taxid:[^)]*\)*/g, '');

          });
          return receivedData2;
      }
      catch (e){
          console.log('error: ', e);
          // handle exception
      }
  }

}


// requestNewJob(): void {
//     // request new job creates a job with status 0 now, status 1 when files are send (start job method)
//     this.jsonUpload.postObj<ProphaneJobObject>(this.currentProphaneJob, 'mpacloud/v1/prophaneRequestJob').subscribe(res => {
//         this.currentProphaneJob = res;
//         // this.prophaneJobIDReady = !(this.currentProphaneJob.prophaneJobUUID === '');
//         // TODO: obsolete? --> rework
//         if (res.status === 'JOB_REJECTED') {
//             this.jobUnavailable = true;
//         } else {
//             this.jobUnavailable = false;
//         }
//     });
//
//     postObj<T>(obj: T, api: string): Observable<T> {
//         console.log('IDPROVIDER: ' + this.authGuard.getIdProvider())
//         httpOptions.headers = new HttpHeaders({
//             'Content-Type': 'application/json',
//             'Authorization': this.authGuard.getUserAuthorization(),
//         });
//         return this.http.post<T>(this.webserver.getwebserverurl() + api, obj, httpOptions);
//     }
