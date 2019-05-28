import {Component} from '@angular/core';
import {SidenavService} from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'app';

  opened: boolean = true;

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.getOpened().subscribe((value: boolean) => {
      this.opened = value;
      console.log('Aufruf: ' + this.opened);
    });
  }

}
