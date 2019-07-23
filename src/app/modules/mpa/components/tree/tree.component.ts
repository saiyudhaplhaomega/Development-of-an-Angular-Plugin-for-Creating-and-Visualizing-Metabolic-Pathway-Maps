import { Component, OnInit, Injectable } from '@angular/core';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { FolderComponent } from '../../components/folder/folder.component';
import { ExperimentComponent } from '../../components/experiment/experiment.component';
import { MPAData } from '../../interfaces/mpadata';
import { SearchComponent } from '../../components/search/search.component';
import { FileComponent } from '../../components/file/file.component';


class Folder implements MPAData {
  icon = 'folder';
  component = FolderComponent;
  constructor(public children: number[], public name: string, public uuid: string) {}
}

class Search implements MPAData {
  name = 'Search Database';
  icon = 'search';
  component = SearchComponent;
  children = [];
  constructor(public uuid: string) {}
}

class File implements MPAData {
  name = 'File';
  icon = 'insert_drive_file';
  component = FileComponent;
  children = [];
  constructor(public uuid: string) {}
}

class Experiment implements MPAData {
  icon = 'computer';
  component = ExperimentComponent;
  constructor(public name: string, public uuid: string, public children: number[]) {
  }
}

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public id, public data: MPAData, public level = 1, public expandable = false,
              public isLoading = false) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
export class DynamicDatabase {
  dataMap = new Map<number, MPAData>();

  constructor() {
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
    return this.rootLevelNodesIds.map(id => new DynamicFlatNode(id, this.getData(id), 0, this.isExpandable(id)));
  }

  getChildren(id: number): number[] | undefined {
    return this.dataMap.get(id).children;
  }

  getData(id: number): MPAData | undefined {
    return this.dataMap.get(id);
  }

  isExpandable(id: number): boolean {
    console.log(id, this.dataMap.get(id).children.length);
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
    this._treeControl.expansionModel.changed.subscribe(change => {
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
      console.log(node);
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
    }, 500);
  }
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  providers: [DynamicDatabase]
})
export class TreeComponent {

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
