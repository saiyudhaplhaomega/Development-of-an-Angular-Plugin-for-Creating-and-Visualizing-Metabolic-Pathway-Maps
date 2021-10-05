import {Component, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, OnInit} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TreeNode } from '../data-navigation-tree/objects/tree-node';
import { NavService } from '../data-navigation-tree/services/nav.service';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ],
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent {

  @Input() node: TreeNode;

  @Output() expandChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private navService: NavService) { }

  onExpand() {
    this.node.expanded = !this.node.expanded;
    this.expandChange.emit(this.node.expanded);
  }

  onNavigate() {
    this.navService.navigateOutlet(this.node.displayName, this.node.uuid, this.node.type);
    console.log(this.navService);
    console.log(this.node);
  }


}
