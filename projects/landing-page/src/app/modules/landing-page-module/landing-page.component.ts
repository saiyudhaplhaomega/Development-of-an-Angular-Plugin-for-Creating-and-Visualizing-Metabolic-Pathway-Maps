import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  
  @ViewChild('section1') section1: ElementRef;
  @ViewChild('section2') section2: ElementRef;
  @ViewChild('section3') section3: ElementRef;
  @ViewChild('newsfeed') newsfeed: ElementRef;

  scrollToSection(target: ElementRef) {
    if (target && target.nativeElement) {
      target.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToSection1() {
    this.scrollToSection(this.section1);
  }

  scrollToSection2() {
    this.scrollToSection(this.section2);
  }

  scrollToSection3() {
    this.scrollToSection(this.section3);
  }

  scrollToNewsfeed() {
    this.scrollToSection(this.newsfeed);
  }
  
  tools = [
    {
      title: 'Meta Proteome Analyzer',
      description:
        'Meta Proteome Analyzer is a powerful tool for analyzing (meta)proteomic data.',
      imageSrc: './assets/img/MPA.jpeg',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
    {
      title: 'MPA Pathway Tool',
      description: 'Meta proteome analyzer patway tool',
      imageSrc: '',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
    {
      title: 'Prophane',
      description:
        'Prophane is a cutting-edge tool for analyzing complex biological data.',
      imageSrc: './assets/img/P.jpg',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
    {
      title: 'Multiomics visualizer ',
      description: 'Knowledge Graph for analyzing omics data',
      imageSrc: '',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
    {
      title: 'MetaForge',
      description:
        'MetaForge is a versatile tool for manipulating and analyzing biological metadata.',
      imageSrc: './assets/img/Meta.png',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
    {
      title: 'Omics Feature Finder',
      description: 'OFF Tool.',
      imageSrc: '',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
  ];

  scripts = [
    {
      title: 'R Scripts',
      description: 'R Scripts for statictial analyzes.',
      imageSrc: './assets/img/R.png',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
  ];

  knowgraphs = [
    {
      title: 'PharMeBINet',
      description: 'PharMeBINet for Interaction overwiev',
      imageSrc: './assets/img/R.png',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
    {
      title: 'Clinical Knowledge Graph',
      description: 'Clinical Knowledge Graphh for Interaction overwiev',
      imageSrc: '',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
  ];

  updateList = [
    {
      title: 'MPA Website is now online',
      type: 'Tool added',
      author: 'Daniel Kautzner',
      link: 'https://gitlab.com/kay.schallert/mpa-website/-/tree/mpa_development?ref_type=heads',
    },
    {
      title: 'Updated MdOA Landing Page',
      type: 'Update',
      author: 'Daniel Kautzner',
      link: '#',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
