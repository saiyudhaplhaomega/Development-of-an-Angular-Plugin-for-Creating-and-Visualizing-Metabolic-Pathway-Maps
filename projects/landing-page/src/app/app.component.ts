import { Component } from "@angular/core";
import {
  AuthService,
  NestedNavigationRoute,
  SimpleNavigationRoute
} from "shared-lib";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Multi-Dimensional-Omics Toolbox";
  homelink: SimpleNavigationRoute = {
    route: '/home',
    label: 'Home',
  };

  routes: NestedNavigationRoute[] = [
    {
      label: 'Tools',
      requireAuth: false,
      children: [
        { route: '/mpa-page', label: 'MPA' },
        { route: '/prophane-page', label: 'Prophane' },
        { route: '/metaforge-page', label: 'MetaForge' },
        { route: '/app-tools', label: 'Test' },
      ],
    },
    {
      label: 'Scripts',
      requireAuth: false,
      children: [
        { route: '/rscripts', label: 'R Scripts' },
        { route: '/pscripts', label: 'Python Scripts' },
      ],
    },
    {
      label: 'Training',
      requireAuth: false,
      children: [
        { route: '/workshops', label: 'Workshops' },
        { route: '/tutorials', label: 'Tutorial' },
      ],
    },
    {
      label: 'About',
      requireAuth: false,
      children: [
        { route: '/mdoa', label: 'MdOA Team' },
        { route: '/other', label: 'Other Team' },
      ],
    },
  ];

  footerContent: NestedNavigationRoute[] = [
    {
      label: "About",
      children: [
        { label: "About MdOA Toolbox", route: "/about" },
        { label: "Terms of Service", route: "/termsofservice" },
        { label: "Privacy Policy", route: "/privacypolicy" },
        { label: "Impressum", route: "/impressum" }
      ]
    },
    {
      label: "Funding & Support",
      children: [
        { label: "DFG", href: "http://www.dfg.de" },
        { label: "de.NBI", href: "http://www.denbi.de" },
        { label: "de.NBI Cloud", href: "https://www.denbi.de/cloud" },
        { label: "NFDI4Microbiota", href: "http://nfdi4microbiota.de" },
      ]
    }
  ];

  footerLogoPath = "assets/isaslogooffizielleformrgbweiss.png";

  showLogo: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeOAuth();
  }
}
