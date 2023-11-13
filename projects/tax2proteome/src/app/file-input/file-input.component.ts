import { Component, OnInit } from '@angular/core';
import {NamesService} from '../names.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

  fileName = 'No file selected';

  constructor(
      private namesService: NamesService,
  ) { }

  ngOnInit(): void {
  }

  // upload function
  openFile(event) {
    if (event.target.files[0].size > 307200){
      alert('File is too big!');
      return;
    }
    if (event.target.files.length > 0)
    {
      this.fileName = event.target.files[0].name;
    }
    else {this.fileName = 'more than one file selected'}
    const input = event.target;
    for (let index = 0; index < input.files.length; index++) {
      const reader = new FileReader();
      reader.readAsText(input.files[index]);
      reader.onload = () => {
        // this 'text' is the content of the file
        const text = reader.result;
        if (typeof text === 'string') {
          const textList = text.split(/,|\n|\t/).map(Number).filter(Boolean);
          const taxObject = this.namesService.getNames(textList).catch((err) => console.log('error: ', err));
        }
      };
    }
  }
}
