import { Component, Input, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ContentComponent } from '../../interfaces/content.component';
import { MPAData } from '../../interfaces/mpadata';
import { ContentService } from '../../services/content.service';
import { DynamicDatabaseService } from '../../services/dynamic-database.service';
import { FileComponent } from '../file/file.component';
import { FolderComponent } from '../folder/folder.component';
import { ExperimentComponent } from '../experiment/experiment.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() id: number;
  content: ViewContainerRef;
  private data: MPAData;

  constructor(private database: DynamicDatabaseService,
    private resolver: ComponentFactoryResolver,
    private contentService: ContentService) { }

  createComponent() {
    this.content.clear();
    // Resolve a factory
    let componentFactory;
    switch (this.data.type) {
      case 'file': {
        componentFactory = this.resolver.resolveComponentFactory(FileComponent);
        break;
      }
      case 'experiment': {
        componentFactory = this.resolver.resolveComponentFactory(ExperimentComponent);
        break;
      }
      case 'folder': {
        componentFactory = this.resolver.resolveComponentFactory(FolderComponent);
        break;
      }
      case 'search': {
        componentFactory = this.resolver.resolveComponentFactory(SearchComponent);
        break;
      }
      default: {
        componentFactory = this.resolver.resolveComponentFactory(SearchComponent);
      }
    }
    // Create a component
    const componentRef = this.content.createComponent(componentFactory);
    (<ContentComponent>componentRef.instance).uuid = this.data.uuid;
    (<ContentComponent>componentRef.instance).name = this.data.name;
  }

  ngOnInit(): void {
    this.contentService.currentTemplateRef.subscribe(ref => this.content = ref);
    this.data = this.database.get(this.id);
  }
}
