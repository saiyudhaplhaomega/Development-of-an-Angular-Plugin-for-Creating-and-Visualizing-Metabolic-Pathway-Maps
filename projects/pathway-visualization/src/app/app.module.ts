import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestChartComponent } from './components/test-chart/test-chart.component';
import { CanvasTestComponent } from './components/canvas-test/canvas-test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestChartComponent,
    CanvasTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
