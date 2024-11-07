import { Component } from '@angular/core';
import { NetworkManagerService } from '../../services/network-manager.service';

@Component({
  selector: 'vis-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private networkService: NetworkManagerService) {
    
  }
}
