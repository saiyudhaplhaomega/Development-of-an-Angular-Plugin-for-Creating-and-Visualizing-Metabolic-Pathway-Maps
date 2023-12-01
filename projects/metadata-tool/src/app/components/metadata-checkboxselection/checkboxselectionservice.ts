import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MetaDataCheckboxSelectionComponent } from './metadata-checkboxselection.component';

@Injectable({
  providedIn: 'root',
})
export class CheckboxSelectionService {
  
  private selectableProperties1CounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectableProperties1Counter$: Observable<number> = this.selectableProperties1CounterSubject.asObservable();

  private selectableCharacteristicCounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectableCharacteristicCounter$: Observable<number> = this.selectableCharacteristicCounterSubject.asObservable();

  private selectableProperties2CounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectableProperties2Counter$: Observable<number> = this.selectableProperties2CounterSubject.asObservable();

  private selectableCommentsCounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectableCommentsCounter$: Observable<number> = this.selectableCommentsCounterSubject.asObservable();

  updateProperties1Counter(count: number) {
    this.selectableProperties1CounterSubject.next(count);
  }

  updateCharacteristicCounter(count: number) {
    this.selectableCharacteristicCounterSubject.next(count);
  }

  updateProperties2Counter(count: number) {
    this.selectableProperties2CounterSubject.next(count);
  }

  updateCommentsCounter(count: number) {
    this.selectableCommentsCounterSubject.next(count);
  }

  public mergedSelectionSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(MetaDataCheckboxSelectionComponent.mergedSelection);
  mergedSelection$: Observable<any[]> = this.mergedSelectionSubject.asObservable();

  updateMergedSelection(selection: any[]) {
    this.mergedSelectionSubject.next(selection);
  }
}
