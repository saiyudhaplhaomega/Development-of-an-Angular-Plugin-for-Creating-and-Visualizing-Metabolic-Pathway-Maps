import { Component } from '@angular/core';

@Component({
  selector: 'app-metadata-workflow-page',
  templateUrl: './metadata-workflow-page.component.html',
  styleUrls: ['./metadata-workflow-page.component.scss'],
})
export class MetadataWorkflowPageComponent {
    showSelection: boolean = true;

    toggleSelection() {
        this.showSelection = !this.showSelection;
      }

}
