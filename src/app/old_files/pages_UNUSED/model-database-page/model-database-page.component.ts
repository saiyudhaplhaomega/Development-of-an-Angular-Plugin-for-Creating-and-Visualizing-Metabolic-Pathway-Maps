import {Component} from '@angular/core';
import {ModeluploaderService} from '../../services_UNUSED/modeluploader.service';
import {ModelDownloaderService} from '../../services_UNUSED/modeldownloader.service';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {ModelContentService} from '../../services_UNUSED/modelcontent.service';
import {ModelJSON} from '../../../mpa/objects/modeljson';
import {ModelJobObject} from '../../../mpa/objects/modeljobjson';

@Component({
  selector: 'app-model-database-page',
  templateUrl: './model-database-page.component.html',
  styleUrls: ['./model-database-page.component.css']
})

export class ModelDatabasePageComponent {

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
      this.uploaderService.modelJobinit(this.paramters).subscribe( res => {
        console.log('test: ' + res.toString());
        this.uploaderService.upload(this.file, res.toString()).subscribe(d => {
          console.log(d);
        });
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
