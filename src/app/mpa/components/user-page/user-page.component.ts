import { Component, OnInit } from '@angular/core';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { DataService } from '../data-navigation-tree/services/data.service';
import v1 from 'uuid/v1';

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
