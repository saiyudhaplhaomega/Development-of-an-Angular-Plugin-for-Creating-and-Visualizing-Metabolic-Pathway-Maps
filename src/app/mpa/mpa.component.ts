import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from './components/data-navigation-tree/services/data.service';
import {NavService} from './components/data-navigation-tree/services/nav.service';
import {NavItem} from './components/data-navigation-tree/objects/nav-item';

@Component({
  selector: 'app-mpa',
  templateUrl: './mpa.component.html',
  styleUrls: ['./mpa.component.css']
})

export class MPAComponent implements /*AfterViewInit,*/ OnInit {
/*  @ViewChild('appDrawer', {static: false}) appDrawer: ElementRef;*/

  navItems: NavItem[];

  constructor(private navService: NavService, private dataService: DataService) {
  }

  onCollapseAll() {
    this.navService.toogleAllChildren.next(true);
  }

  onHideAll() {
    this.navService.toogleAllChildren.next(false);
  }

/*  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }*/

  ngOnInit(): void {
    this.dataService.NavItems.subscribe(data => {
      this.navItems = data;
    });
  }

}
