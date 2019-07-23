import { Component, Input, ViewContainerRef, ComponentFactoryResolver, Type, Output, EventEmitter, OnInit } from '@angular/core';
import { ContentComponent } from '../../interfaces/content.component';
import { MPAData } from '../../interfaces/mpadata';
import { FolderComponent } from '../folder/folder.component';
import { ExperimentComponent } from '../experiment/experiment.component';
import { FileComponent } from '../file/file.component';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() data: MPAData;
  content: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private contentService: ContentService) { }

  createComponent() {
    this.content.clear();
    // Resolve a factory
    const componentFactory = this.resolver.resolveComponentFactory(this.data.component);
    // Create a component
    const componentRef = this.content.createComponent(componentFactory);
    (<ContentComponent>componentRef.instance).uuid = this.data.uuid;
    (<ContentComponent>componentRef.instance).name = this.data.name;
  }

  ngOnInit(): void {
    this.contentService.currentTemplateRef.subscribe(ref => this.content = ref);
  }
}
