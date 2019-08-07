import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DynamicFlatNode } from '../classes/dynamic-flat-node';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private treeArray = new BehaviorSubject(null);
  currentTreeArray = this.treeArray.asObservable();

  constructor() { }

  changeTree(templateRef: DynamicFlatNode[]) {
    this.treeArray.next(templateRef);
  }

}
