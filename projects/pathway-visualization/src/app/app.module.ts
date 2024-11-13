import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NetworkVisualizationRootComponent } from './components/network-visualization-root/network-visualization-root.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NetworkCanvasComponent } from './components/network-canvas/network-canvas.component';
import { NetworkDataTableComponent } from './components/network-data-table/network-data-table.component';
import { NetworkCanvasService } from './services/network-canvas.service';
//import { TestChartComponent } from './components/test-chart/test-chart.component';
//import { CanvasTestComponent } from './components/canvas-test/canvas-test.component';

//import { MainComponent } from './components/force-chart/force-chart.component';
//import { ControlPanelComponent } from './components/force-chart/control-panel/control-panel.component';
//import { SearchBarComponent } from './components/force-chart/search-container/search-container.component';
//import { ShortestPathComponent } from './components/force-chart/shortest-path/shortest-path.component';
//import { MolecularExplorationComponent } from './molecular-exploration/molecular-exploration.component';
//import { MolecularEditingComponent } from './molecular-editing/molecular-editing.component';
//new refactoring 

@NgModule({
  declarations: [
    AppComponent,
    NetworkVisualizationRootComponent,
    ToolbarComponent,
    SearchBarComponent,
    NetworkCanvasComponent,
    NetworkDataTableComponent,

  //  TestChartComponent,
   // CanvasTestComponent,
    //MainComponent,
    //ControlPanelComponent,
    //SearchBarComponent,
    //ShortestPathComponent,
    //MolecularExplorationComponent,
   //MolecularEditingComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [NetworkCanvasService],
  bootstrap: [AppComponent],
})
export class AppModule {}
