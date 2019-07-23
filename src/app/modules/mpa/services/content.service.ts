import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private templateRefSource = new BehaviorSubject(null);
  currentTemplateRef = this.templateRefSource.asObservable();

  constructor() { }

  changeTemplateRef(templateRef: ViewContainerRef) {
    this.templateRefSource.next(templateRef);
  }

}
