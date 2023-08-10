import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavService2} from '../services/nav2.service';
import {DataItem} from '../objects/data-item';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  animations: [trigger('indicatorRotate', [state('collapsed', style({transform: 'rotate(0deg)'})), state('expanded', style({transform: 'rotate(180deg)'})), transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),])],
  styleUrls: ['./tree-node.component.css']
})

export class TreeNodeComponent {

  @Input() node: DataItem;

  constructor(private navService: NavService2) {
  }

  onExpand() {
    this.node.expanded = !this.node.expanded;
  }

  onNavigate() {
    this.navService.navigateOutlet(this.node);
  }

}
