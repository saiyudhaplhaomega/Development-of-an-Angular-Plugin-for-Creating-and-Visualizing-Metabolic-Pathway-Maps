import { Component, OnInit } from '@angular/core';
import { ToolCardComponent } from './tool-card/tool-card.component';
@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  tools = [
    {
      title: 'Meta Proteome Analyzer',
      description: 'Meta Proteome Analyzer is a powerful tool for analyzing proteomic data.',
      imageSrc: './assets/img/MPA.jpeg',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads'
    },
    {
      title: 'Prophane',
      description: 'Prophane is a cutting-edge tool for analyzing complex biological data.',
      imageSrc: './assets/img/P.png',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads'
    },
    {
      title: 'MetaForge',
      description: 'MetaForge is a versatile tool for manipulating and analyzing biological metadata.',
      imageSrc: './assets/img/Meta.png',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads'
    },
    {
        title: 'R Scripts',
        description: 'R Scripts for statictial analyzes.',
        imageSrc: './assets/img/R.png',
        link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads'
      },

  ];
// scripts = [    {
//   title: 'R Scripts',
//   description: 'R Scripts for statictial analyzes.',
//   imageSrc: './assets/img/R.png',
//   link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads'
// },]; 

  updateList = [
    { title: 'MPA Website is now online', type: 'Tool added', author: 'Daniel Kautzner', link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads' },
    { title: 'Updated MdOA Landing Page', type: 'Update', author: 'Daniel Kautzner', link: '#' },

  ];

  constructor() {}

  ngOnInit(): void {}
}
