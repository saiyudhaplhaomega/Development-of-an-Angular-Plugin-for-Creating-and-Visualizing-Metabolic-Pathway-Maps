import { Component } from '@angular/core';
import { ToolOverviewCardComponent } from '../../layout-modules/tool-overview-card-module/tool-overview-card.component';
@Component({
  selector: 'template-page',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent {
  tableData = [
    { rowHeader: 'User Interface', data1: 'Webapplication / Command-Line-Interface' },
    { rowHeader: 'Local Installation', data1: 'Docker, Conda'},
    { rowHeader: 'Input', data1: 'Value (from MPA)' },
    { rowHeader: 'Output', data1: 'Value (can be used in Prophane)'},

  ];
developerData = [
  { name: 'Developer 1', email: 'developer1@example.com', link: '/developer1', affiliation: 'University Bielefeld', role: 'Backend'},
  { name: 'Developer 2', email: 'developer2@example.com', link: '/developer2', affiliation: 'ISAS', role: 'Frontend' },
  { name: 'Developer 3', email: 'developer3@example.com', link: '/developer3', affiliation: 'Other',role: 'Designer'  }
];

mentionData = [
  { name: 'Tester 1', email: 'developer1@example.com', link: '/developer1', affiliation: 'University Bielefeld', role: 'Tester' },
  { name: 'Helper 2', email: 'developer2@example.com', link: '/developer2', affiliation: 'ISAS', role: 'Helper/Expertise'  },
];

updateList = [
  {
    title: 'New Content',
    type: 'Content',
    author: 'Daniel Kautzner',
    link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
  },
  {
    title: 'Newest Version',
    type: 'Version',
    author: 'Daniel Kautzner',
    link: '#',
  },
  {
    title: 'Bugfixes',
    type: 'Bugfix',
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
