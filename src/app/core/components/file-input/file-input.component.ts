import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnChanges {

  @Input() selectedFile: File;
  @Input() labels: {inputGroupLabel: string, inputLabel: string};
  @Input() inputType: string;

  @Output() fileSelected = new EventEmitter<FileList>();

  constructor( ) { }

  ngOnChanges() {
    console.log(this.selectedFile);
  }

  onFileChange(files: FileList) {
    this.fileSelected.emit(files);
  }

}
