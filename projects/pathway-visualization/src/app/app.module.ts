import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { TestChartComponent } from './components/test-chart/test-chart.component';
//import { CanvasTestComponent } from './components/canvas-test/canvas-test.component';

import { MainComponent } from './components/force-chart/force-chart.component';
import { ControlPanelComponent } from './components/force-chart/control-panel/control-panel.component';
import { SearchBarComponent } from './components/force-chart/search-container/search-container.component';
import { ShortestPathComponent } from './components/force-chart/shortest-path/shortest-path.component';
import { MolecularExplorationComponent } from './molecular-exploration/molecular-exploration.component';
import { MolecularEditingComponent } from './molecular-editing/molecular-editing.component';

@NgModule({
  declarations: [
    AppComponent,
  //  TestChartComponent,
   // CanvasTestComponent,
    MainComponent,
    ControlPanelComponent,
    SearchBarComponent,
    ShortestPathComponent,
    MolecularExplorationComponent,
    MolecularEditingComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
