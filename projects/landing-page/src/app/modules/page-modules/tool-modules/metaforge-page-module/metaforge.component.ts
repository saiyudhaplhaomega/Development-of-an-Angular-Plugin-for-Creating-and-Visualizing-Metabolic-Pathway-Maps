import { Component } from '@angular/core';

@Component({
  selector: 'metaforge-page',
  templateUrl: './metaforge.component.html',
  styleUrls: ['./metaforge.component.scss'],
})

export class MetaForgeComponent {
  tableData = [
    { rowHeader: 'User Interface', data1: 'Webapplication' },
    { rowHeader: 'Local Installation', data1: 'No (Docker installation planned)'},
    { rowHeader: 'Input', data1: 'Value (from MPA)' },
    { rowHeader: 'Output', data1: 'Value (can be used in Prophane)'},

  ];
developerData = [
  { name: 'Kay Schallert', email: 'developer1@example.com', link: '/developer1', affiliation: 'ISAS', role: 'Lead Developer'},
  { name: 'Daniel Kautzner', email: 'developer2@example.com', link: '/developer2', affiliation: 'University Bielefeld', role: 'Frontend, Backend, AI-Implementation'  },
  { name: 'Bene', email: 'developer3@example.com', link: '/developer3', affiliation: 'Other', role: 'Frontend, AI-Implementation'  },
  { name: 'Johnathan', email: 'developer3@example.com', link: '/developer3', affiliation: 'Other', role: 'Frontend' }  
];

mentionData = [
  { name: 'Patrick', email: 'developer1@example.com', link: '/developer1', affiliation: 'OVGU', role: 'Tester' },
  { name: 'Dirk', email: 'developer2@example.com', link: '/developer2', affiliation: 'Hochschule Anhalt', role: 'Tester'  },
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
