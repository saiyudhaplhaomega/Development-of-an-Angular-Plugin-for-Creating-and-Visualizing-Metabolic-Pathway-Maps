import { Component } from '@angular/core';

@Component({
  selector: 'app-metadata-quest-page',
  templateUrl: './metadata-quest-page.component.html',
  styleUrls: ['./metadata-quest-page.component.scss'],
})
export class MetadataQuestPageComponent {
  currentUploadProgress: number;

  showQuest: boolean = false;

  handleUploadStatusChange(uploadStatus: {
    progress: number;
    started: boolean;
  }) {
    this.showQuest = uploadStatus.started;
  }
}
