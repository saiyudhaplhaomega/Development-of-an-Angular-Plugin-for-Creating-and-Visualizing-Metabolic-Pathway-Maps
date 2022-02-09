import { Component, OnInit, Input } from '@angular/core';
import {ProteinJSON} from '../../objects/tableobjects';

@Component({
  selector: 'app-description-details',
  templateUrl: './description-details.component.html',
  styleUrls: ['./description-details.component.css']
})
export class DescriptionDetailsComponent implements OnInit {

  @Input() selectedProtein: ProteinJSON;

  constructor() { }

  ngOnInit() {
  }

}
