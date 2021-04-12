import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { TreeNode } from './../objects/tree-node';
import { DataService } from './data.service';
import { DataItem } from '../objects/data-item';
import { UserPageComponent } from '../../user-page/user-page.component';
import { FolderPageComponent } from '../../folder-page/folder-page.component';
import { ExperimentPageComponent } from '../../experiment-page/experiment-page.component';

export interface ContentComponent {
  uuid: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavService {

  public treeContentRef = new BehaviorSubject<ViewContainerRef>(undefined);
  private _contentRef: ViewContainerRef;

  public currentUrl = new BehaviorSubject<string>(undefined);
  public treeNodes = new BehaviorSubject<TreeNode[]>(undefined);
  public expandedNodes = new BehaviorSubject<string[]>(undefined);

  private _dataMap: Map<string, DataItem>;
  private _expandedNodes: string[] = [];

  constructor(private router: Router,
    private dataService: DataService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
    this.dataService.dataMap.subscribe(items => {
      if (items) {
        this._dataMap = items;
        this.treeNodes.next(this.processData(items, this._expandedNodes));
      }
    });
    this.expandedNodes.subscribe(expandedNodes => {
      if (expandedNodes) {
        this._expandedNodes = expandedNodes;
        this.treeNodes.next(this.processData(this._dataMap, expandedNodes));
      }
    });
    this.treeContentRef.subscribe((val) => {
      this._contentRef = val;
    });
    this.dataService.dataChange.subscribe((change) => {
      if (change === 'removeFolder') {
        this.clearOutlet();
      }
    });
  }

  private processData(data: Map<string, DataItem>, expandedNodes: string[]) {
    let tree: TreeNode[] = new Array();
    let processedUUID = new Map();

    console.log(this._dataMap.size);

    while (processedUUID.size < this._dataMap.size) {
      for (const item of this._dataMap.values()) {
        if (!processedUUID.has(item.uuid)) {
          if (!item.parent) {
            // No Parent
            console.log('No Parent');
            console.log(item);
            tree.push(
              {
                displayName: item.displayName,
                icon: item.icon,
                hasChildren: item.children && item.children.length > 0,
                depth: 0,
                expanded: expandedNodes ? expandedNodes.indexOf(item.uuid) > -1 : false,
                uuid: item.uuid,
                type: item.type,
              }
            );

            processedUUID.set(item.uuid, 0);
          } else if (item.parent && processedUUID.has(item.parent) && expandedNodes.indexOf(item.parent) > -1) {
            // UNHIDDEN and PROCESSED Parent
            console.log('UNHIDDEN and PROCESSED Parent');
            for (let index = 0; index < tree.length; index++) {
              if (tree[index].uuid === item.parent) {
                tree.splice(index + 1, 0,
                  {
                    displayName: item.displayName,
                    icon: item.icon,
                    hasChildren: item.children && item.children.length > 0,
                    depth: processedUUID.get(item.parent) + 1,
                    expanded: expandedNodes ? expandedNodes.indexOf(item.uuid) > -1 : false,
                    uuid: item.uuid,
                    type: item.type,
                  }
                );
                break;
              }
            }
            processedUUID.set(item.uuid, processedUUID.get(item.parent) + 1);
          } else if (expandedNodes.indexOf(item.parent) <= -1) {
            //HIDDEN
            console.log('HIDDEN');
            processedUUID.set(item.uuid, processedUUID.get(item.parent) + 1);
          }
        }
      }
      }
    return tree;
  }

  navigateOutlet(name: string, uuid: string, type: string) {
    this._contentRef.clear();
    // Resolve a factory
    let componentFactory;
    switch (type) {
      case 'user': {
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserPageComponent);
        break;
      }
      case 'folder': {
        console.log('folder');
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(FolderPageComponent);
        break;
      }
      case 'experiment': {
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(ExperimentPageComponent);
        break;
      }
      default: {
      }
    }
    // Create a component
    const componentRef = this._contentRef.createComponent(componentFactory);
    (<ContentComponent>componentRef.instance).uuid = uuid;
    (<ContentComponent>componentRef.instance).name = name;
  }

  clearOutlet() {
    if (this._contentRef) {
      this._contentRef.clear();
    }
  }

}
