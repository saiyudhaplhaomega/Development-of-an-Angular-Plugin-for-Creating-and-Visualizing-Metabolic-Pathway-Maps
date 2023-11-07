import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DataService } from '../../services/data.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { DataItem } from '../../model/data-item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-navigation-tree',
  templateUrl: './data-navigation-tree.component.html',
  styleUrls: ['./data-navigation-tree.component.css'],
})
export class DataNavigationTreeComponent implements OnInit, OnDestroy {
  dataServiceSubscription: Subscription;
  treeNodes: DataItem[];

  constructor(
    private _snackBar: MatSnackBar,
    public navService: NavService,
    public dataService: DataService,
    public router: Router
  ) {}

  ngOnInit() {
    this.dataServiceSubscription = this.dataService.dataMap.subscribe(
      (newMap) => {
        if (newMap !== undefined && newMap.isInitialized) {
          this.treeNodes = newMap.getDataItemList();
        }
      }
    );
  }

  ngOnDestroy() {
    this.dataServiceSubscription.unsubscribe();
  }

  isVisible(treeNode: DataItem): boolean {
    let isVisible = true;
    let child = treeNode;
    while (child.type !== 'user') {
      const parent = this.treeNodes.find(
        (search) => search.id === child.parent
      );
      if (!parent.expanded) {
        isVisible = false;
        break;
      }
      child = parent;
    }
    return isVisible;
  }

  drop(event: CdkDragDrop<string[]>) {
    // console.log(this._treeNodes);
    // if (event.previousIndex === 0 || event.currentIndex === event.previousIndex) {
    //   this._snackBar.open('The user can not be moved!', '', {duration: 2000});
    //   return;
    // }
    // const movedNode = this._treeNodes[event.previousIndex];
    // const targetNode = this._treeNodes[event.currentIndex];
    // if (targetNode.type === 'experiment') {
    //   this._snackBar.open('Experiment can not have children!', '', {duration: 2000});
    //   return;
    // }
    // this.dataService.moveDataItem(targetNode.id, movedNode.id);
  }

  // getBackgroundColor(treeNode) {
  //   return treeNode === this.selectedNode ? 'gold' : '';
  // }
}
