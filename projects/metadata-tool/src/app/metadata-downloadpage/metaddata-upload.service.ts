import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class MetaDataDownloadService {
 
  constructor(private http: HttpClient) {}

  downloadFileFromServer(): Observable<any> {
    return this.http.get('YOUR_SERVER_URL', { responseType: 'blob' });
  }
}