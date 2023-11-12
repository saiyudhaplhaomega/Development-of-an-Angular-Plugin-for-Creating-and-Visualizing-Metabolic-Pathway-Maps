import { Component } from '@angular/core';

@Component({
  selector: 'metadata-uploadpage', // Ensure this matches the selector used in your HTML
  templateUrl: './metadata-quest-page.component.html', // Path to the HTML template
})
export class MetadataUploadpageComponent {
  // Define properties and methods for your component here
  title = 'Metadata Upload Page';

  constructor() {
    // Initialization code
  }

  // Example method
  uploadFile() {
    // Logic for file upload
  }
}
