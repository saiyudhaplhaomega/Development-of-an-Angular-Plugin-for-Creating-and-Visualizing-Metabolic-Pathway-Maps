import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class UploadProgressService {

  fastaProgress = 0;
  reportProgress = 0;
  total = 0;
  progress = 0;


  private pSource = new BehaviorSubject(this.progress);
  currentProgress = this.pSource.asObservable();

  constructor(){}

  changeFastaLoaded(bytes: number){
    this.fastaProgress = bytes;
    this.updateProgress();
  }

  changeReportLoaded(bytes: number){
    this.reportProgress = bytes;
    this.updateProgress();
  }

  addToTotal(bytes: number) {
    this.total += bytes;
  }

  updateProgress() {
    const p = Math.round((this.fastaProgress + this.reportProgress) / this.total * 100)
    if (p > this.progress) {
      this.pSource.next(p)
    }
  }

}
