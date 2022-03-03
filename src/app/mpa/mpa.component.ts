import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { NavService } from './components/data-navigation-tree/services/nav.service';
import {first, takeUntil, takeWhile} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-mpa',
  templateUrl: './mpa.component.html',
  styleUrls: ['./mpa.component.css']
})

export class MPAComponent implements OnInit {

  // treeoutlet - template reference variable
  // ViewChild can grab references to the DOM element with the variable #treeoutlet
  // with read: ViewContainerRef it grabs component views - views are display elements

  @ViewChild('treeoutlet', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  notifier = new Subject();

  constructor(
    private navService: NavService) {
  }

  ngOnInit() {
    this.navService.treeContentRef.next(this.viewContainerRef);

    this.navService.treeNodes.pipe( // TODO: check if this is working
      takeWhile(value => typeof value === 'undefined')).subscribe(event => {
      if (this.navService.treeNodes.value) {
        console.log(this.navService.treeNodes.value);
        this.notifier.next();
        const userNode = this.navService.treeNodes.value.find(node => node.type === 'user');
        this.navService.navigateOutlet(userNode.displayName, userNode.id, 'user');
      }
    }
    );
  }
}


