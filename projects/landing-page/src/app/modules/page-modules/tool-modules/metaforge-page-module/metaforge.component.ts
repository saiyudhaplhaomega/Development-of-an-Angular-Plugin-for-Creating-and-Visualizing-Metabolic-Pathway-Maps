import { Component } from '@angular/core';
import { OverviewCardComponent } from '../../layout/overview-card/overview-card.component';
@Component({
  selector: 'metaforge-page',
  templateUrl: './metaforge.component.html',
  styleUrls: ['./metaforge.component.scss'],
})
export class MetaForgeComponent {
  tableData = [
    { rowHeader: 'User Interface', data1: 'Webapplication / Command-Line-Interface' },
    { rowHeader: 'Local Installation', data1: 'Docker, Conda'},
    { rowHeader: 'Input', data1: 'Value (from MPA)' },
    { rowHeader: 'Output', data1: 'Value (can be used in Prophane)'},

  ];
developerData = [
  { name: 'Developer 1', email: 'developer1@example.com', link: '/developer1', affiliation: 'University Bielefeld' },
  { name: 'Developer 2', email: 'developer2@example.com', link: '/developer2', affiliation: 'ISAS'  },
  { name: 'Developer 3', email: 'developer3@example.com', link: '/developer3', affiliation: 'Other'  }
];

updateList = [
  {
    title: 'MetaForge Website is now online',
    type: 'Tool added',
    author: 'Daniel Kautzner',
    link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
  },
  {
    title: 'New Content',
    type: 'Update',
    author: 'Daniel Kautzner',
    link: '#',
  },
];

  goToLink(url: string): void {
    window.open(url, "_blank");
  }
  constructor() {}

  ngOnInit(): void {}
}
