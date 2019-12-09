import { Component } from '@angular/core';
import {FileUploaderService} from '../../../core/services/file-uploader.service';
import {HttpClient} from '@angular/common/http';
import {ProtDBJSON} from '../../../mpa/objects/protdbjson';
import {ProtDBContentService} from '../../services_UNUSED/protein-database.service';

@Component({
  selector: 'app-protein-database-page',
  templateUrl: './protein-database-page.component.html',
  styleUrls: ['./protein-database-page.component.css']
})

export class ProteinDatabasePageComponent {

  file: File;
  files: FileList;
  protdbs: ProtDBJSON[];

  constructor (private uploaderService: FileUploaderService, private http: HttpClient, private protdbservice: ProtDBContentService) {}

  onChange(files: FileList) {
    this.files = files;
    this.file = files[0];
  }

  upload(): void {
    console.log(this.file)
    if (this.file) {
      this.uploaderService.postFile(this.file, 'mpacloud/v1/proteinDBLoader').subscribe(d => {
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
