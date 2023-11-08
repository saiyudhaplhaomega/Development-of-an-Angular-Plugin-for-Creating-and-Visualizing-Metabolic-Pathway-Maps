import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { NodeNameValidator } from '../../name-edit-dialog/name-edit-dialog.component';
import { HttpClientService } from 'dist/shared-lib';

export class ProteinDBDialogData {
  dbName: string;
  dbFile: File;
}

@Component({
  selector: 'app-protein-database-dialog',
  templateUrl: './protein-database-dialog.component.html',
  styleUrls: ['./protein-database-dialog.component.css'],
})
export class ProteinDatabaseDialogComponent implements OnInit {
  proteinDBForm: UntypedFormGroup;
  existingNodeNames: string[];
  formData: ProteinDBDialogData = new ProteinDBDialogData();

  // private _dataMap: Map<number, DataItem>;

  constructor(
    public dialogRef: MatDialogRef<ProteinDatabaseDialogComponent>,
    private fb: UntypedFormBuilder,
    private dataService: DataService,
    private uploaderService: HttpClientService
  ) {}

  ngOnInit() {
    this.existingNodeNames = this.dataService.getExistingNodeNames();

    this.proteinDBForm = this.fb.group({
      dbName: [
        '',
        [
          Validators.required,
          Validators.pattern('[äÄöÖüÜa-zA-Z0-9_-]*'),
          NodeNameValidator(this.existingNodeNames),
        ],
      ],
      dbFile: ['', [Validators.required]],
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
