import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MetadataLandingPageComponent } from "./metadata-landing-page.component";
import { NgParticlesModule } from "ng-particles";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    MetadataLandingPageComponent // Declare the component here
  ],
  imports: [NgParticlesModule, MatIconModule, MatButtonModule],
  exports: [
    MetadataLandingPageComponent // Now you can export it
  ]
})
export class LandingPageModules {}
