import {Component, OnInit} from '@angular/core';
import {ModeluploaderService} from './modeluploader.service';
import {ModelDownloaderService} from './modeldownloader.service';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ModelContentService} from './modelcontent.service';
import {ModelJSON} from './modeljson';
import * as FileSaver from 'file-saver';
import {ModelJobJSON, ModelJobObject} from './modeljobjson';

/*FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBOM })*/

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Component({
  selector: 'app-modelcontent',
  templateUrl: './modelcontent.component.html',
  styleUrls: ['./modelcontent.component.css']
})

export class ModelcontentComponent {

  file: File;
  files: FileList;
  data: Blob;
  fileUrl;
  imageBlobUrl;
  paramters: ModelJobObject;
  isbalanced = true;

  models: ModelJSON[];

  constructor(private uploaderService: ModeluploaderService, private downloaderService: ModelDownloaderService,
              private http: HttpClient, private modelservice: ModelContentService, private sanitizer: DomSanitizer) {
  }

  onChange(files: FileList) {
    this.files = files;
    this.file = files[0];
  }

  changeBalancedCheckbox(str: string) {
    this.isbalanced = !this.isbalanced;
  }

  upload(): void {
    this.paramters = new ModelJobObject();
    this.paramters.pride_id_list = [];
    this.paramters.isbalanced = this.isbalanced.toString();
    this.paramters.model_generator_job_id = '';
    if (this.file) {
      this.uploaderService.upload(this.file, this.paramters).subscribe(d => {
        console.log(d);
      });
    }
  }

/*
  download() {
    FileSaver.saveAs(this.imageBlobUrl, 'hello world.txt');
  }
*/

  newCSV(prideid: string): void {
    this.downloaderService.getTextFile().subscribe((res) => {
/*      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(
          new Blob([res.body])
        ));*/
      this.createImageFromBlob(res);
      /*FileSaver.saveAs(new Blob(res.body), 'hello world.txt');*/
      },
      response => {
        console.log('POST in error', response);
      },
      () => {
        console.log('POST observable is now completed.');
      });
    /*    return this.downloaderService.getTextFile('assets/textfile.txt')
      .subscribe();*/
  }

    createImageFromBlob(image: Blob) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageBlobUrl = reader.result;

      }, false);

/*      if (image) {
        /!*reader.readAsDataURL(image);*!/
        FileSaver.saveAs((new Blob(image)), 'hello world.txt');
      }*/
    }




  /*  this.exportService.getExcelFromServer().subscribe((data: HttpResponse<Blob>) => {
    const filename = this.getFileNameFromDispositionHeader(data.headers.get('Content-Disposition'));
    saveAs(data.body, filename);
    this.isDownloading = false;
  }, error => {
    console.log(error);
    this.isDownloading = false;
  });*/

  getModels(): void {
    this.modelservice.getModels().subscribe(res => {
      this.models = res;
    });
  }

}
