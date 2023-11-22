import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css'],
})
export class InfoBoxComponent {
  @Input() item: any; // Define the structure as per your need

  constructor() {}

  // Additional methods if needed
}
