import {DataItem} from './data-item';
import {NodeType} from '../services/data2.service';
import {Data} from '@angular/router';

export class DataItemMap {

  rootNode: DataItem;
  isInitialized: boolean = false;
  highestNodeId: number;

  public initializeAndReturnUser(rootNode: DataItem): DataItem {
    this.rootNode = rootNode;
    if (this.rootNode.children === undefined) {
      this.rootNode.children = [];
    }
    this.isInitialized = true;
    return this.rootNode;
  }

  public getDataItemList(): DataItem[] {
    return this.addNodeAndChildren(this.rootNode);
  }
  private addNodeAndChildren(parentNode: DataItem): DataItem[] {
    const dataItemList = []
    dataItemList.push(parentNode);
    parentNode.children.forEach(child => {
      const childList = this.addNodeAndChildren(child);
      childList.forEach(dataItem => {
        dataItemList.push(dataItem);
      });
    });
    return dataItemList;
  }

  public getAllDisplayNames(): string[] {
    const displayNames: string[] = [];
    this.getDataItemList().forEach(item => {
      displayNames.push(item.displayName);
    });
    return displayNames;
  }

  public addNewItemFromParent(newNode: DataItem, parentNode: DataItem): void {
    this.highestNodeId = -1;
    this.getDataItemList().forEach(node => {
      if (node.id > this.highestNodeId) {
        this.highestNodeId = node.id;
      }
    });
    newNode.id = this.highestNodeId + 1;
    this.findSpecificNode(this.rootNode, parentNode.id).children.push(newNode);
  }

  public findSpecificNode(startingNode: DataItem, searchNodeId: number): DataItem {
    let foundNode = null;
    if (startingNode.id === searchNodeId) {
      return startingNode;
    }
    for (const child of startingNode.children) {
      if (child.id === searchNodeId) {
        foundNode = child;
        break;
      }
      foundNode = this.findSpecificNode(child, searchNodeId);
      if (foundNode !== null) {
        break;
      }
    }
    return foundNode;
  }

  public removeItemReturnParent(removeNode: DataItem): DataItem {
    const parentNode = this.findSpecificNode(this.rootNode, removeNode.parent);
    const newChildren = [];
    parentNode.children.forEach(child => {
      if (child.id !== removeNode.id) {
        newChildren.push(child);
      }
    });
    parentNode.children = newChildren;
    return parentNode;
  }

  public moveItemAfterNode(): void {

  }

  public getAllChildren(dataItem: DataItem): DataItem[] {
    const parent = this.findSpecificNode(this.rootNode, dataItem.id);
    const allChildren = [];
    parent.children.forEach(child => {
      allChildren.concat(this.addNodeAndChildren(child));
    });
    return allChildren;
  }

}
