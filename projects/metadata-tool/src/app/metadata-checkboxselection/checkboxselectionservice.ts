import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckboxSelectionService {
  
  private section1CounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  section1Counter$: Observable<number> = this.section1CounterSubject.asObservable();

  private section2CounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  section2Counter$: Observable<number> = this.section2CounterSubject.asObservable();

  private section3CounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  section3Counter$: Observable<number> = this.section3CounterSubject.asObservable();

  private section4CounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  section4Counter$: Observable<number> = this.section4CounterSubject.asObservable();

  updateSection1Counter(count: number) {
    this.section1CounterSubject.next(count);
  }

  updateSection2Counter(count: number) {
    this.section2CounterSubject.next(count);
  }

  updateSection3Counter(count: number) {
    this.section3CounterSubject.next(count);
  }

  updateSection4Counter(count: number) {
    this.section4CounterSubject.next(count);
  }

  private mergedSelectionSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  mergedSelection$: Observable<any[]> = this.mergedSelectionSubject.asObservable();

  updateMergedSelection(selection: any[]) {
    this.mergedSelectionSubject.next(selection);
  }
}
