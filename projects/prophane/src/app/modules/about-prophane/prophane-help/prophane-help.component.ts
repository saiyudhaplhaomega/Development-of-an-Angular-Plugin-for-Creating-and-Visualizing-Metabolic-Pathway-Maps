import { Component, OnInit } from '@angular/core';
import { lcaParams, quantdata, databaseOptions } from '../../../model/prophaneFormData';


@Component({
  selector: 'app-help',
  templateUrl: './prophane-help.component.html',
  styleUrls: ['./prophane-help.component.scss']
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
