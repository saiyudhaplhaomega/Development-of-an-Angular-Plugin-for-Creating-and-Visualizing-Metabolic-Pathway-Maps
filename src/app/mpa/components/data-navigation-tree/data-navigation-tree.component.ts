import { Component, OnInit } from '@angular/core';
import { TreeNode } from './objects/tree-node';
import { Router } from '@angular/router';
import { NavService } from './services/nav.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DataService } from './services/data.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-data-navigation-tree',
  templateUrl: './data-navigation-tree.component.html',
  styleUrls: ['./data-navigation-tree.component.css']
})
export class DataNavigationTreeComponent implements OnInit {
  id: string;
  name: string;
  selectedNode: string;

  _treeNodes: TreeNode[];
  private _expandedNodes: string[] = [];

  constructor(private _snackBar: MatSnackBar,
              public navService: NavService,
              public dataService: DataService,
              public router: Router) {

  }

  ngOnInit() {
    this.navService.treeNodes.subscribe(nodes => {
      this._treeNodes = nodes;
    });

    // this._treeNodes.map(node => {
    //   if (node.expanded === true) {
    //     this._expandedNodes.push(node.id);
    //   }
    // });

  }

  onExpand(event, treeNode) {
    const index = this._expandedNodes.indexOf(treeNode.id);
    if (index > -1) {
      this._expandedNodes.splice(index, 1);
    } else {
      this._expandedNodes.push(treeNode.id);
    }
    this.navService.expandedNodes.next(this._expandedNodes);
  }

  onSelected(event, treeNode) {
    this.selectedNode = treeNode;
    console.log(treeNode);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(this._treeNodes);
    if ( event.previousIndex === 0 || event.currentIndex === event.previousIndex) {
      this._snackBar.open('The user can not be moved!', '', {duration: 2000});
      return;
    }
    const movedNode = this._treeNodes[event.previousIndex];
    const targetNode = this._treeNodes[event.currentIndex];
    if (targetNode.type === 'experiment') {
      this._snackBar.open('Experiment can not have children!', '', {duration: 2000});
      return;
    }
    this.dataService.moveDataItem(targetNode.id, movedNode.id);
  }

  getBackgroundColor(treeNode) {
    return treeNode === this.selectedNode ? 'gold' : '';
  }
}
