import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  db_date: string;

  constructor(
      private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.get_db_date()
  }
  get_db_date(){
    this.httpClient.get('assets/db_version.txt', {responseType: 'text'}).subscribe(db_d => this.db_date = db_d)
  }
}
