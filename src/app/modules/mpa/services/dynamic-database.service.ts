import { Injectable } from '@angular/core';
import { MPAData } from '../interfaces/mpadata';
import { Folder } from '../classes/folder';
import { Experiment } from '../classes/experiment';
import { Search } from '../classes/search';
import { File } from '../classes/file';
import { DynamicFlatNode } from '../classes/dynamic-flat-node';
import { TreeService } from './tree.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicDatabaseService {

  /**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
  data = new Array<MPAData>();
  dataMap = new Map<number, MPAData>();

  constructor(private tree: TreeService) {
    this.dataMap.set(0, new Folder([1, 2], 'this is a folder', '0'));
    for (let _i = 1; _i < 4; _i++) {
      this.dataMap.set(_i, new Experiment('this is an experiment', _i.toString(), [_i + 4, _i + 4 * 2]));
      this.dataMap.set(_i + 4, new Search((_i + 4).toString()));
      this.dataMap.set(_i + 4 * 2, new File((_i + 4 * 2).toString()));
    }
  }

  rootLevelNodesIds: number[] = [0, 3];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodesIds.map(id => new DynamicFlatNode(id, 0, this.isExpandable(id)));
  }

  getChildren(id: number): number[] | undefined {
    return this.dataMap.get(id).children;
  }

  get(id: number): MPAData | undefined {
    return this.dataMap.get(id);
  }

  update(id: number, value: MPAData) {
    return this.dataMap.set(id, value);
  }

  isExpandable(id: number): boolean {
    console.log(id, this.dataMap.get(id).children.length);
    return this.dataMap.get(id).children.length > 0;
  }

  delete(id: number): boolean {
    this.getChildren(id).forEach(element => {
      this.dataMap.delete(element);
    });
    this.dataMap.delete(id);
    this.dataMap.forEach((value: MPAData, key: number) => {
      if (value.children.includes(id)) {
        value.children.splice(value.children.indexOf(id), 1);
        this.update(id, value);
      }
    });
    let currentTreeArray;
    this.tree.currentTreeArray.subscribe( arr => currentTreeArray = arr);
    currentTreeArray.splice(currentTreeArray.indexOf(new DynamicFlatNode(id, 0, this.isExpandable(id)), 1));
    this.tree.changeTree(currentTreeArray);
    return true;
  }
}
