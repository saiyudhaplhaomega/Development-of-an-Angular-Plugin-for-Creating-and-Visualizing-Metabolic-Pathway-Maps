import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  dbId: string;
  status = '';
  ready = false;
  resultUrl = 'https://tax2proteome.de/downloader/';

  @ViewChild('bindingInput') bindingInput: ElementRef;

  constructor(
      private configService: ConfigService, ) {
  }

  ngOnInit(): void {
  }

  getDownloadLink() {
    this.dbId = this.configService.resultLink;
    return this.dbId;
  }

  setDownloadUrl(dbId){
    this.resultUrl = 'https://tax2proteome.de/downloader/' + dbId;
    this.getDownloadUrl();
  }

  getDownloadUrl(){
    // console.log(this.result_url)
    return this.resultUrl;
  }

  CheckProgress() {
    this.dbId = this.bindingInput.nativeElement.value.trim();
    this.configService.getProgress(this.dbId).catch((err) => console.log('error: ', err));
    this.setDownloadUrl(this.dbId);
    setTimeout(() =>
        {
          this.status = this.configService.status;
          if (this.status.startsWith('status 01')){
            this.ready = true;
          }
          return this.status;
        },
        1000);
  }
}
