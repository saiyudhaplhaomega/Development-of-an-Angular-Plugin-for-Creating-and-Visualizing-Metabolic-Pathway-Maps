import { Component } from '@angular/core';
import {ProteinUploaderService} from '../../../../core/services/protein-uploader.service';
import {HttpClient} from '@angular/common/http';
import {ProtDBJSON} from '../../../../core/models/protdbjson';
import {ProtDBContentService} from '../../../../core/services/protein-database.service';

@Component({
  selector: 'app-protein-database-page',
  templateUrl: './protein-database-page.component.html',
  styleUrls: ['./protein-database-page.component.css']
})

export class ProteinDatabasePageComponent {

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
