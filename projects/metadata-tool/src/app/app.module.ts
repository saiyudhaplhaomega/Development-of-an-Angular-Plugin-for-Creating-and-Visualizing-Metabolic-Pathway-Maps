import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { StandardPageLayoutModule } from "dist/shared-lib";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NgParticlesModule } from "ng-particles";
import { LandingModule } from "projects/signaling-tool/src/app/landing-page/landing-page.module";
import { MetadataLandingPageComponent } from "./pages/metadata-landing-page/metadata-landing-page.component";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";


@NgModule({
  declarations: [AppComponent, MetadataLandingPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    NgParticlesModule,

    StandardPageLayoutModule,
    BrowserAnimationsModule,

    HttpClientModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule,

    // Material design imports
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent, LandingModule]
})
export class AppModule {}
