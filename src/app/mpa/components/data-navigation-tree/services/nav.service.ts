import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {TreeNode} from '../objects/tree-node';
import {DataService} from './data.service';
import {DataItem} from '../objects/data-item';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  public currentUrl = new BehaviorSubject<string>(undefined);
  public treeNodes = new BehaviorSubject<TreeNode[]>(undefined);
  public expandedNodes = new BehaviorSubject<string[]>(undefined);

  private _dataMap: Map<string, DataItem>;
  private _expandedNodes: string[] = [];

  constructor(
    private router: Router,
    private dataService: DataService) {

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.currentUrl.next(event.urlAfterRedirects);
    //   }
    // });
    //
    // this.dataService.dataMap.subscribe(items => {
    //   if (items) {
    //     this._dataMap = items;
    //     this.treeNodes.next(this.processData(items, this._expandedNodes));
    //   }
    // });
    //
    // this.expandedNodes.subscribe(expandedNodes => {
    //   if (expandedNodes) {
    //     this._expandedNodes = expandedNodes;
    //     this.treeNodes.next(this.processData(this._dataMap, expandedNodes));
    //   }
    // });

    // this.treeContentRef.subscribe((val) => {
    //   console.log('setting _containerref' + val);
    //   this._contentRef = val;
    //   console.log('set _containerref' + this._contentRef);
    // });

    /*    this.dataService.dataChange.subscribe((change) => {
          switch (change.event) {
            case 'removeNode':
              this.onDelete(change);
              break;
            case 'add':
              this.onCreation(change);
              break;
          }
        });*/
  }

  // private processData(data: Map<string, DataItem>, expandedNodes: string[]) {
  //   const tree: TreeNode[] = [];
  //   const processedUUID = new Map();
  //   console.log('DATA: ' + data);
  //   while (processedUUID.size < this._dataMap.size) {
  //     for (const item of this._dataMap.values()) {
  //       if (!processedUUID.has(item.id)) {
  //         if (!item.parent) {
  //           // No Parent
  //           console.log('No Parent');
  //           tree.push(
  //             {
  //               displayName: item.displayName,
  //               icon: item.icon,
  //               hasChildren: item.children && item.children.length > 0,
  //               depth: 0,
  //               expanded: expandedNodes ? expandedNodes.indexOf(item.id) > -1 : false,
  //               id: item.id,
  //               type: item.type,
  //             }
  //           );
  //
  //           processedUUID.set(item.id, 0);
  //         } else if (item.parent && processedUUID.has(item.parent) && expandedNodes.indexOf(item.parent) > -1) {
  //           // UNHIDDEN and PROCESSED Parent
  //           console.log('UNHIDDEN and PROCESSED Parent');
  //           for (let index = 0; index < tree.length; index++) {
  //             if (tree[index].id === item.parent) {
  //               tree.splice(index + 1, 0,
  //                 {
  //                   displayName: item.displayName,
  //                   icon: item.icon,
  //                   hasChildren: item.children && item.children.length > 0,
  //                   depth: processedUUID.get(item.parent) + 1,
  //                   expanded: expandedNodes ? expandedNodes.indexOf(item.id) > -1 : false,
  //                   id: item.id,
  //                   type: item.type,
  //                 }
  //               );
  //               break;
  //             }
  //           }
  //           processedUUID.set(item.id, processedUUID.get(item.parent) + 1);
  //         } else if (expandedNodes.indexOf(item.parent) <= -1) {
  //           // HIDDEN
  //           console.log('HIDDEN');
  //           processedUUID.set(item.id, processedUUID.get(item.parent) + 1);
  //         }
  //       }
  //     }
  //     }
  //   return tree;
  // }

  navigateOutlet(name: string, id: string, type: string) {

  }

  // onDelete(node: DataChangeObj) {
  //   if (this._contentRef && node.currentNodeUuid !== node.finalNodeUuid) {
  //     const finalObj = this._dataMap.get(node.finalNodeUuid);
  //     this.navigateOutlet(finalObj.displayName, node.finalNodeUuid, finalObj.type);
  //   } else if (this._contentRef && node.currentNodeUuid === node.targetNodeUuid || node.finalNodeUuid === node.targetNodeUuid) {
  //     this._contentRef.clear();
  //   }
  // }

  // onCreation(node: DataChangeObj) {
  //   const newObj = this._dataMap.get(node.finalNodeUuid);
  //   this.navigateOutlet(newObj.displayName, node.finalNodeUuid, newObj.type);
  // }

}
