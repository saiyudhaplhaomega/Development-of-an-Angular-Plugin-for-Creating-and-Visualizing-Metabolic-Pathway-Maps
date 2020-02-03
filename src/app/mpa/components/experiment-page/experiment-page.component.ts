import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-navigation-tree/services/data.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticatedSerializableObjectUploaderService } from '../../../core/services/authenticated-serializable-object-uploader.service';
import { createNewProteinGroup } from '../mpa-table/mpa-table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProteinGroupList } from '../../objects/tableobjects';


@Component({
  selector: 'app-experiment-page',
  templateUrl: './experiment-page.component.html',
  styleUrls: ['./experiment-page.component.css']
})
export class ExperimentPageComponent implements OnInit {

  uuid: string;
  name: string;

  private _dataMap: Map<string, DataItem>;
  proteinList: ProteinGroupList = {experiment_uuid: this.uuid, protein_groups: []};

  constructor(private _snackBar: MatSnackBar, private dataService: DataService,
    private uploaderService: AuthenticatedSerializableObjectUploaderService) {
    }

  ngOnInit() {
    this.dataService.dataMap.subscribe( items => {
      this._dataMap = items;
    });
    this.uploaderService.postObj<ProteinGroupList>({experiment_uuid: this.uuid, protein_groups: []}, 
      'mpacloud/v1/fetchProteinGroups').subscribe( data => {
      this.proteinList = data;
    }, err => {
      const protein_groups = [];
      for (let i = 1; i <= 100; i++) { protein_groups.push(createNewProteinGroup(i)); }
      this.proteinList = {experiment_uuid: this.uuid, protein_groups: protein_groups};
    });
  }

  errorHandler(error: HttpErrorResponse) {

  }

  onAccept() {
    if (this.name.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.name = '';
    } else if (this.name.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      const item = this._dataMap.get(this.uuid);
      item.displayName = this.name;
      this._dataMap.set(this.uuid, item);
      this.dataService.dataMap.next(this._dataMap);
    }
  }

}
