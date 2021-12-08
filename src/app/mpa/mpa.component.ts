import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { NavService } from './components/data-navigation-tree/services/nav.service';
import {Endpoints, WebserveraddressService, WebserverUrls} from '../core/services/webserveraddress.service';

@Component({
  selector: 'app-mpa',
  templateUrl: './mpa.component.html',
  styleUrls: ['./mpa.component.css']
})

export class MPAComponent implements OnInit {

  // treeoutlet - template reference variable
  // ViewChild can grab references to the DOM element with the variable #treeoutlet
  // with read: ViewContainerRef it grabs component views - views are display elements


  @ViewChild('treeoutlet', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  constructor(
    private navService: NavService,
    private httpUrlBuilder: WebserveraddressService) {
  }


  ngOnInit() {
    console.log(this.httpUrlBuilder.getEndpoint(Endpoints.GET_USER_DATA));
    this.navService.treeContentRef.next(this.viewContainerRef);
    const userNode = this.navService.treeNodes.value.find(node => node.type === 'user');
    this.navService.navigateOutlet(userNode.displayName, userNode.uuid, 'user');
  }
}


