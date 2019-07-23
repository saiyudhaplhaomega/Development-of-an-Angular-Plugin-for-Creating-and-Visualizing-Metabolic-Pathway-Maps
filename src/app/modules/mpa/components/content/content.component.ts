import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @ViewChild('dynamicComponent', {read: ViewContainerRef}) content: ViewContainerRef;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.changeTemplateRef(this.content);
  }

}
