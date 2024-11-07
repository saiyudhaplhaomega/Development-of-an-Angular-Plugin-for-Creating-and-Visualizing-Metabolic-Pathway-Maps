import { Component } from '@angular/core';
import { NetworkManagerService } from '../../services/network-manager.service';

@Component({
  selector: 'vis-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  constructor(private networkService: NetworkManagerService) {
    
  }
}
