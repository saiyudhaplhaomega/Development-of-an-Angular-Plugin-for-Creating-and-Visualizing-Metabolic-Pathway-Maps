import { Component, OnInit } from '@angular/core';
import { NetworkManagerService } from '../../services/network-manager.service';
import { NetworkCanvasService } from '../../services/network-canvas.service';
import { Node, Edge } from '../../models/network-elements.model';

@Component({
  selector: 'vis-network-data-table',
  templateUrl: './network-data-table.component.html',
  styleUrls: ['./network-data-table.component.scss']
})

//Define our component classes and initialize the molecularFiles array with two molecular files.
export class NetworkDataTableComponent implements OnInit {
  molecularFiles: string[] = []; //An array to store the names of files.
  selectedFile: string | null = null; //A variable to store the name of the file that the user selects.
  //Constructor is like a super hero function, here we are creating an instance of the services, NetworkManagerService and NetworkCanvasService.
  constructor(
    private networkManagerService: NetworkManagerService,
    private networkCanvasService: NetworkCanvasService
  ) {}
   
  ngOnInit(): void {
    //calls the method searchMolecularFiles() from networkManagerService and list the files exist in molecular directory.
    this.networkManagerService.searchMolecularFiles().subscribe(files => { 
      this.molecularFiles = files;
    });
  }
  onFileSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const file = target.value;
    //console.log('this is the file from onFIleSelect ',file);
    this.networkManagerService.handleFileSelection(file).subscribe(() => {
      this.selectedFile = file;
      this.networkCanvasService.networkData =  this.networkManagerService.getNetworkData();
      this.networkCanvasService.networkMap = this.networkManagerService.getNetworkMap();
    });
  }

  //these fucntions are for the html side to retrieve data.
  get nodes(): Node[] {
    return this.networkCanvasService.nodes;
  }

  get edges(): Edge[] {
    return this.networkCanvasService.edges;
  }

  getNodeAdditionalData(dataRef: string): any {
    return this.networkManagerService.getNodeAdditionalData(dataRef);
  }

  getEdgeAdditionalData(dataRef: string): any {
    return this.networkManagerService.getEdgeAdditionalData(dataRef);
  }
}
