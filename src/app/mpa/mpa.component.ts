import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NavService } from './components/data-navigation-tree/services/nav.service';

@Component({
  selector: 'app-mpa',
  templateUrl: './mpa.component.html',
  styleUrls: ['./mpa.component.css']
})

export class MPAComponent implements AfterViewInit/*, OnInit*/ {
/*  @ViewChild('appDrawer', {static: false}) appDrawer: ElementRef;*/

  @ViewChild('treeoutlet', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  constructor(private navService: NavService) {
  }

  ngAfterViewInit() {
    this.navService.treeContentRef.next(this.viewContainerRef);
  }
}
