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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    StandardPageLayoutModule,
    BrowserAnimationsModule,

    HttpClientModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule,

    // Material design imports
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
