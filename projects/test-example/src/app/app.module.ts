import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StandardPageLayoutModule } from 'shared-lib';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StandardPageLayoutModule,
    AppRoutingModule,
  ],
})
export class AppModule {}
