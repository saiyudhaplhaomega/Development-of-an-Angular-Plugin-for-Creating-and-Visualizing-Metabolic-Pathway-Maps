import { Component } from '@angular/core';
import {ProteinUploaderService} from './proteindbuploader.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProtDBJSON} from './protdbjson';
import {ProtDBContentService} from './proteinloadercontent.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-proteinloadercontent',
  templateUrl: './proteinloadercontent.component.html',
  styleUrls: ['./proteinloadercontent.component.css']
})

export class ProteinloadercontentComponent {

  file: File;
  files: FileList;
  protdbs: ProtDBJSON[];

  constructor (private uploaderService: ProteinUploaderService, private http: HttpClient, private protdbservice: ProtDBContentService) {}

  onChange(files: FileList) {
    this.files = files;
    this.file = files[0];
  }

  upload(): void {
    console.log(this.file)
    if (this.file) {
      this.uploaderService.upload(this.file).subscribe(d => {   // "data" can be your file or image in base64 or other encoding
        console.log(d);
      });
    }
  }

  getProtDBs() {
    this.protdbservice.getProtDBs().subscribe(res => {
      this.protdbs = res;
    });
  }
}
