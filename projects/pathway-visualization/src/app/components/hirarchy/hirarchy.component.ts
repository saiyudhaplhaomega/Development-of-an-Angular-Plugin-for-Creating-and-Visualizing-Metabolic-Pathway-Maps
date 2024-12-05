import { NetworkCanvasService } from './../../services/network-canvas.service';
import { NetworkManagerService } from './../../services/network-manager.service';
import { Component } from '@angular/core';

@Component({
  selector: 'vis-hirarchy',
  templateUrl: './hirarchy.component.html',
  styleUrls: ['./hirarchy.component.scss']
})
export class HirarchyComponent {
  public orthogonalEnabled: boolean = false;
  public hirarchyActiveIndex: number = 0;
  public activeToolName: string = 'search';
  public hirarchyNodes: any = [];
  constructor(
    private networkManagerService: NetworkManagerService,
    private networkCanvasService: NetworkCanvasService
    
  ) {
    this.networkCanvasService.activeToolName$.subscribe(toolName => {
      this.activeToolName = toolName;
      
    });
    this.networkCanvasService.hirarchyActiveIndex$.subscribe(index => {
      this.hirarchyActiveIndex = index;
      this.hirarchyNodes = this.networkCanvasService.getHirarchyNodes();
    });
  }
  orthogonalMode() {
    this.networkCanvasService.activeToolName = this.networkCanvasService.activeToolName == 'orthogonalMode' ? 'search' : 'orthogonalMode';
    this.orthogonalEnabled =  !this.orthogonalEnabled;
    if (this.networkCanvasService.getSimulation()) this.networkCanvasService.getSimulation().alpha(0.3).restart();
  }
  revertBackToParent(index) {
    if (this.hirarchyActiveIndex > 0) {

      this.hirarchyActiveIndex = this.hirarchyActiveIndex - 1;
      const parentNode = this.hirarchyNodes[this.hirarchyActiveIndex];

      // Remove all nodes after the parent node in the hierarchy
      this.hirarchyNodes.splice(this.hirarchyActiveIndex + 1);

      //if (parentNode) this.loadData(parentNode);
    }
  }
  selectHirarchy(index) {
    const parentFileName = this.hirarchyNodes[index];
    this.hirarchyNodes = this.hirarchyNodes.slice(0, index + 1); // removed 
    this.hirarchyActiveIndex = index; // update the current index
    this.networkCanvasService.hirarchyActiveIndex = index;

    // if (parentFileName) this.loadDataByNameAndIndex(parentFileName, index);
  }
  loadData(fileName) {
    // d3.json(`assets/${fileName}`).then((data: any) => {
    //   this.nodesData = data.nodes;
    //   this.edgesData = data.edges;
    //   this.shortestPath = [];
    //   this.activeToolName = 'search'
    //   this.drawCanvas(data);  // Call drawGraph with the loaded data
    //   this.hirarchyActiveIndex = this.hirarchyActiveIndex + 1;
    //   if (!this.hirarchyNodes.includes(fileName)) this.hirarchyNodes.push(fileName);

    // }).catch((e) => {
    //   alert(`There is available file named ${fileName}`)
    // })
  }
}
