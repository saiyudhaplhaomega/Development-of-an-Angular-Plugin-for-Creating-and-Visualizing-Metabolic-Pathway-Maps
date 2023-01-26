import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent {

  @Input() selectedFile: File;
  @Input() labels: {inputGroupLabel: string, inputLabel: string};
  @Input() inputType: string;

  @Output() fileSelected = new EventEmitter<FileList>();

  constructor( ) { }

  onFileChange(files: FileList) {
    this.fileSelected.emit(files);
  }

}
