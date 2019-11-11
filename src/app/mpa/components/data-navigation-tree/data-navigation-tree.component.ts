import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavItem } from './objects/nav-item';
import { Router } from '@angular/router';
import { NavService } from './services/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-data-navigation-tree',
  templateUrl: './data-navigation-tree.component.html',
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ],
  styleUrls: ['./data-navigation-tree.component.css']
})
export class DataNavigationTreeComponent implements OnInit {

  expanded: boolean;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.toogleAllChildren.subscribe(value => {
      this.expanded = value;
    });
    this.navService.toogleNode.subscribe(value => {
      if (this.item.uuid === value) {
        if (this.item.children && this.item.children.length) {
          this.expanded = !this.expanded;
        }
      }
    });
  }

  onExpand(event: Event, item: NavItem) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  onNavigate(event: Event, item: NavItem) {
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log(this.depth);
    this.router.navigate([item.route, item.uuid]);
  }

}
