import {Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NavService2} from './components/data-navigation-tree/services/nav2.service';
import {UserPageComponent} from './components/user-page/user-page.component';
import {FolderPageComponent} from './components/folder-page/folder-page.component';
import {ExperimentPageComponent} from './components/experiment-page/experiment-page.component';
import {ProteinDatabaseComponent} from './components/protein-database/protein-database-component';
import {PeaklistPageComponent} from './components/peaklist-page/peaklist-page.component';
import {SearchResultPageComponent} from './components/search-result-page/search-result-page.component';
import {DataItem} from './components/data-navigation-tree/objects/data-item';
import {Subscription} from 'rxjs';
import {NodeType} from './components/data-navigation-tree/services/data2.service';

export interface ContentComponent {
  dataItemOfThisComponent: DataItem;
}

@Component({
  selector: 'app-mpa', templateUrl: './mpa.component.html', styleUrls: ['./mpa.component.css']
})

export class MPAComponent implements OnInit, OnDestroy {

  // treeoutlet - template reference variable
  // ViewChild can grab references to the DOM element with the variable #treeoutlet
  // with read: ViewContainerRef it grabs component views - views are display elements

  @ViewChild('treeoutlet', {read: ViewContainerRef}) treeOutlet: ViewContainerRef;

  // notifier = new Subject();
  createComponentSubscription: Subscription;

  constructor(private navService: NavService2) {
  }

  ngOnInit() {
    this.createComponentSubscription = this.navService.navigateComponentEvent$.subscribe(dataItem => {
      this.navigateOutlet(dataItem);
    });
  }

  ngOnDestroy() {
    this.createComponentSubscription.unsubscribe();
  }

  // ngAfterViewInit() {
  //   // TODO: something to put here?
  //   // this.navService.treeNodes.pipe( // TODO: check if this is working
  //   //   takeWhile(value => typeof value === 'undefined')).subscribe(event => {
  //   //     if (this.navService.treeNodes.value) {
  //   //       console.log(this.navService.treeNodes.value);
  //   //       this.notifier.next(null); // TODO: angular 7->13 upgrade: added 1 as argument, does this work?
  //   //       const userNode = this.navService.treeNodes.value.find(node => node.type === 'user');
  //   //       this.navService.navigateOutlet(userNode.displayName, userNode.id, 'user');
  //   //     }
  //   //   }
  //   // );
  // }

  private navigateOutlet(dataItem: DataItem) {
    this.treeOutlet.clear();
    let componentRef: ComponentRef<any>;
    switch (dataItem.type) {
      case NodeType.User: {
        componentRef = this.treeOutlet.createComponent(UserPageComponent);
        break;
      }
      case NodeType.Folder: {
        componentRef = this.treeOutlet.createComponent(FolderPageComponent);
        break;
      }
      case NodeType.Experiment: {
        componentRef = this.treeOutlet.createComponent(ExperimentPageComponent);
        break;
      }
      case NodeType.ProteinDB: {
        componentRef = this.treeOutlet.createComponent(ProteinDatabaseComponent);
        break;
      }
      case NodeType.PeakList: {
        componentRef = this.treeOutlet.createComponent(PeaklistPageComponent);
        break;
      }
      case NodeType.SearchResult: {
        componentRef = this.treeOutlet.createComponent(SearchResultPageComponent);
        break;
      }
      default: {
        // TODO: add default case?
      }
    }
    (<ContentComponent>componentRef.instance).dataItemOfThisComponent = dataItem;
  }

}


