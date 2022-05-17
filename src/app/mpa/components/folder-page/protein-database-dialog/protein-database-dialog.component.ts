import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataItem} from '../../data-navigation-tree/objects/data-item';
import {DataService2} from '../../data-navigation-tree/services/data2.service';
import {folderNameValidator} from '../../../../core/components/dialog/name-edit-dialog.component';
import {HttpClientService} from '../../../../core/services/http-client.service';

export class ProteinDBDialogData {
  dbName: string;
  dbFile: File;
}

@Component({
  selector: 'app-protein-database-dialog',
  templateUrl: './protein-database-dialog.component.html',
  styleUrls: ['./protein-database-dialog.component.css']
})
export class ProteinDatabaseDialogComponent implements OnInit {

  proteinDBForm: FormGroup;
  existingNodeNames: string[];
  formData: ProteinDBDialogData = new ProteinDBDialogData();

  // private _dataMap: Map<number, DataItem>;

  constructor(
    public dialogRef: MatDialogRef<ProteinDatabaseDialogComponent>,
    private fb: FormBuilder,
    private dataService: DataService2,
    private uploaderService: HttpClientService,
  ) {
  }

  ngOnInit() {
    this.existingNodeNames = this.dataService.getExistingNodeNames();

    this.proteinDBForm = this.fb.group({
      dbName: ['', [
        Validators.required,
        Validators.pattern('[äÄöÖüÜa-zA-Z0-9_-]*'),
        folderNameValidator(this.existingNodeNames)
      ]],
      dbFile: ['', [
        Validators.required
      ]]
    });
  }

  getErrorMessage() {
    if (this.proteinDBForm.get('dbName').hasError('required')) {
      return 'Please enter a name';
    } else if (this.proteinDBForm.get('dbName').hasError('pattern')) {
      return 'no white spaces or special chars';
    } else if (this.proteinDBForm.get('dbName').hasError('forbiddenName')) {
      return 'name already in use';
    }
  }

  onSubmitName(): void {
    // TODO: how does THIS help? After 6 hours of debugging i added this line and it fixes the problems
    this.formData.dbName = this.proteinDBForm.value.dbName;
    console.log('Closing ' + this.formData.dbFile.name);
    console.log('Closing ' + this.formData.dbName);
    this.dialogRef.close(this.formData);
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onDBFileSelect(files: FileList) {
    this.formData.dbFile = files[0];
  }

}
