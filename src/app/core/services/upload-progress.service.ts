import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class UploadProgressService {

  fastaProgress = 0;
  reportProgress = 0;
  total = 0;
  progress = 0;
  complete = 0;

  jobUuid: string;
  private pSource = new BehaviorSubject(0);
  currentProgress = this.pSource.asObservable();

  constructor() {}

  public setUUID(id) {
    this.jobUuid = id;
  }


  public getUUID() {
    return this.jobUuid;
  }

  changeFastaLoaded(bytes: number) {
    this.fastaProgress = bytes;
    this.updateProgress();
  }

  changeReportLoaded(bytes: number) {
    this.reportProgress = bytes;
    this.updateProgress();
  }

  addToTotal(bytes: number) {
    this.total += bytes;
  }

  updateProgress() {
    const p = Math.round((this.fastaProgress + this.reportProgress) / this.total * 100);
    if (p > this.progress) {
      this.progress = p;
      this.pSource.next(p);
    }
  }

  setComplete() {
    this.complete += 1;
    if (this.complete > 1) {
      this.pSource.next(100);
    }
  }

  reset() {
    this.fastaProgress = 0;
    this.reportProgress = 0;
    this.total = 0;
    this.progress = 0;
    this.complete = 0;
  }

}
