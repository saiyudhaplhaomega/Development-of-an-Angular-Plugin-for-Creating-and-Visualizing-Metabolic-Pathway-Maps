import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TreeNode } from '../data-navigation-tree/objects/tree-node';
import { NavService } from '../data-navigation-tree/services/nav.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { DatabaseSearchPageComponent } from '../database-search-page/database-search-page.component';
import { FolderPageComponent } from '../folder-page/folder-page.component';
import { ExperimentPageComponent } from '../experiment-page/experiment-page.component';

export interface ContentComponent {
  uuid: string;
  parentUUID: string;
  name: string;
}

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
export class TreeNodeComponent implements OnInit {

  @Input() node: TreeNode;

  @Output() expandChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private contentRef: ViewContainerRef;

  constructor(
    private navService: NavService,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.navService.treeContentRef.subscribe(ref => {
      this.contentRef = ref;
    });
  }

  onExpand() {
    this.node.expanded = !this.node.expanded;
    this.expandChange.emit(this.node.expanded);
  }

  onNavigate() {
    this.contentRef.clear();
    // Resolve a factory
    let componentFactory;
    switch (this.node.type) {
      case 'user': {
        componentFactory = this.resolver.resolveComponentFactory(UserPageComponent);
        break;
      }
      case 'folder': {
        console.log('folder');
        componentFactory = this.resolver.resolveComponentFactory(FolderPageComponent);
        break;
      }
      case 'experiment': {
        componentFactory = this.resolver.resolveComponentFactory(ExperimentPageComponent);
        break;
      }
      default: {
        componentFactory = this.resolver.resolveComponentFactory(DatabaseSearchPageComponent);
      }
    }
    // Create a component
    const componentRef = this.contentRef.createComponent(componentFactory);
    (<ContentComponent>componentRef.instance).uuid = this.node.uuid;
    (<ContentComponent>componentRef.instance).parentUUID = this.node.uuid;
    (<ContentComponent>componentRef.instance).name = this.node.displayName;
  }
}
