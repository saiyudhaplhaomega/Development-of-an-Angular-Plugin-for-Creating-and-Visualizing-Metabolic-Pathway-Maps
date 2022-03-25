import { Component, OnInit } from '@angular/core';
import { MpaTableDataService } from '../../services/mpa-table-data.service';

@Component({
  selector: 'app-description-details',
  templateUrl: './description-details.component.html',
  styleUrls: ['./description-details.component.css']
})
export class DescriptionDetailsComponent implements OnInit {

  selectedProteinName: string;

  constructor(private mpaTableDataService: MpaTableDataService) {

  }

  ngOnInit() {
    this.mpaTableDataService.selectedProtein.subscribe(protein => {
      this.selectedProteinName = protein ? protein.name : '';
    });
  }

}
