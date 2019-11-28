import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-prophane-viewer',
  templateUrl: './prophane-viewer.component.html',
  styleUrls: ['./prophane-viewer.component.css']
})
export class ProphaneViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     imports: [ FlexLayoutModule ]
  }

}
