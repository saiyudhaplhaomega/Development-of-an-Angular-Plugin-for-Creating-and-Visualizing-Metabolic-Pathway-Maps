import { Component, OnInit } from '@angular/core';
import {databaseOptions, lcaParams, quantdata} from '../../objects/prophaneFormData';

@Component({
  selector: 'app-help',
  templateUrl: './prophane-help.component.html',
  styleUrls: ['./prophane-help.component.css']
})
export class ProphaneHelpComponent implements OnInit {
  readonly lcaOptionStrings = JSON.parse(JSON.stringify(lcaParams));
  readonly quantdata = quantdata
  readonly TaxonomicDatabases = databaseOptions.filter((x) => x['scope'] === 'Taxonomy') ;
  readonly FunctionalDatabases = databaseOptions.filter((x) => x['scope'] === 'Function') ;
  readonly LcaMethods = lcaParams


  constructor() { }

  ngOnInit(): void {
  }

}
