import { Component } from '@angular/core';
import { DataService } from '../data-navigation-tree/services/data.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  uuid: string;
  name: string;

  constructor(private dataService: DataService) { }

  onAddFolder() {
    console.log('add folder');
    this.dataService.addFolder(this.uuid);
  }
}
