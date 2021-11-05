import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent {

  @Input() onFileChangeMethod: (files: FileList) => void;
  @Input() selectedFile: File;
  @Input() labels: {inputGroupLabel: string, inputLabel: string};

  constructor() { }

  onFileChange(selection: FileList) {
    this.onFileChangeMethod(selection);
  }

}
