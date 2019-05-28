import {Component, OnInit} from '@angular/core';
import {SidenavService} from '../../services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private sidenavService: SidenavService) { }

  public changeSideNav() {
    this.sidenavService.toggleOpened();
  }
}
