import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperimentUploadProgressService {

  fileUploadProgress = 0;
  total = 0;
  progress = 0;
  complete = 0;

  jobUuid: string;
  private pSource = new BehaviorSubject(0);
  currentProgress = this.pSource.asObservable();

  constructor() { }

//  TODO: complete this
}
