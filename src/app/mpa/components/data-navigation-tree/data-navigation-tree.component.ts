import { Component, OnInit } from '@angular/core';
import { TreeNode } from './objects/tree-node';
import { Router } from '@angular/router';
import { NavService } from './services/nav.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-data-navigation-tree',
  templateUrl: './data-navigation-tree.component.html',
  styleUrls: ['./data-navigation-tree.component.css']
})
export class DataNavigationTreeComponent implements OnInit {

  _treeNodes: TreeNode[];
  private _expandedNodes: string[] = [];

  constructor(public navService: NavService, public router: Router) {
  }

  ngOnInit() {
    this.navService.treeNodes.subscribe(nodes => {
      this._treeNodes = nodes;
    });
  }

  onExpand(event, treeNode) {
    const index = this._expandedNodes.indexOf(treeNode.uuid);
    if (index > -1) {
      this._expandedNodes.splice(index, 1);
    } else {
      this._expandedNodes.push(treeNode.uuid);
    }
    this.navService.expandedNodes.next(this._expandedNodes);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this._treeNodes, event.previousIndex, event.currentIndex);
  }

}
