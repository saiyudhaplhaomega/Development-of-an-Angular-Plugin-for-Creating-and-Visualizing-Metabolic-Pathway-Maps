import { Component, OnInit } from '@angular/core';
import { lcaParams, quantdata, databaseOptions } from '../../../model/prophaneFormData';
@Component({
  selector: 'app-prophane-about',
  templateUrl: './prophane-about.component.html',
  styleUrls: ['./prophane-about.component.scss']
})
export class ProphaneAboutComponent implements OnInit {
  readonly lcaOptionStrings = JSON.parse(JSON.stringify(lcaParams));
  readonly quantdata = quantdata
  readonly TaxonomicDatabases = databaseOptions.filter((x) => x['scope'] === 'Taxonomy') ;
  readonly FunctionalDatabases = databaseOptions.filter((x) => x['scope'] === 'Function') ;
  readonly LcaMethods = lcaParams

  constructor() { }


  ngOnInit(): void {
  }

}
