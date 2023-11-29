import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MetadataLandingPageComponent } from "./metadata-landing-page.component";
import { NgParticlesModule } from "ng-particles";

@NgModule({
  declarations: [
    MetadataLandingPageComponent // Declare the component here
  ],
  imports: [NgParticlesModule],
  exports: [
    MetadataLandingPageComponent // Now you can export it
  ]
})
export class LandingPageModules {}
