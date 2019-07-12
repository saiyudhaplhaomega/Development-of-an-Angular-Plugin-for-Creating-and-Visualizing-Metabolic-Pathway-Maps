import { Component, Injectable } from '@angular/core';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface Data {
  name:    string;
  icon: string;
  children: number[];
}

class Folder implements Data {
  icon = 'folder';
  constructor(public children: number[], public name: string) {}
}

class Experiment implements Data {
  icon = 'computer';
  constructor(public children: number[], public name: string) {}
}

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public id, public data: Data, public level = 1, public expandable = false,
              public isLoading = false) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
export class DynamicDatabase {
  dataMap = new Map<number, Data>();

  constructor() {
    this.dataMap.set(3, new Experiment([], 'this is an experiment'));
    this.dataMap.set(4, new Experiment([], 'this is a grandchild experiment'));
    this.dataMap.set(2, new Experiment([4], 'this is a child experiment'));
    this.dataMap.set(1, new Experiment([], 'this is a child experiment'));
    this.dataMap.set(0, new Folder([1, 2], 'this is a folder'));
  }

  rootLevelNodesIds: number[] = [0, 3];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodesIds.map(id => new DynamicFlatNode(id, this.getData(id), 0, this.isExpandable(id)));
  }

  getChildren(id: number): number[] | undefined {
    return this.dataMap.get(id).children;
  }

  getData(id: number): Data | undefined {
    return this.dataMap.get(id);
  }

  isExpandable(id: number): boolean {
    console.log(id, this.dataMap.get(id).children.length)
    return this.dataMap.get(id).children.length > 0;
  }
}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
              private _database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.id);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      console.log(node)
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(id =>
          new DynamicFlatNode(id, this._database.getData(id), node.level + 1, this._database.isExpandable(id)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // noindextify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
  providers: [DynamicDatabase]
})
export class TestPageComponent {
  constructor(database: DynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}
