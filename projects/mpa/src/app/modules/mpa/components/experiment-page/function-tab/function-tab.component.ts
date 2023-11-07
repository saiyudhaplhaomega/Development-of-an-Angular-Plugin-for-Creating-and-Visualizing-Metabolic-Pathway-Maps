import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { FunctionDataJSON, FunctionDataJSONObject, FunctionDataObject, FunctionIdentifier } from '../../../model/functiondatajson';

@Component({
  selector: 'app-function-tab',
  templateUrl: './function-tab.component.html',
  styleUrls: ['./function-tab.component.scss']
})
export class FunctionTabComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [
    'functionID',
    'idType',
    'description',
    'quantification'
  ];
  dataSource: MatTableDataSource<FunctionDataObject>;
  filterString: string;

  //TODO temporary mock-data
  functionJSON: FunctionDataJSON;
  selectedFunctionRow: FunctionDataObject;

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.functionJSON = new FunctionDataJSONObject();
    this.functionJSON.functionData = [
      { id: '1', type: FunctionIdentifier.EC, description: 'obj1' },
      { id: '2', type: FunctionIdentifier.EC, description: 'obj2' },
      { id: '3', type: FunctionIdentifier.EC, description: 'obj3' },
      { id: '4', type: FunctionIdentifier.KO, description: 'obj4' },
      { id: '5', type: FunctionIdentifier.EC, description: 'obj5' },
      { id: '6', type: FunctionIdentifier.EC, description: 'obj6' },
      { id: '7', type: FunctionIdentifier.EC, description: 'obj7' },
      { id: '8', type: FunctionIdentifier.KO, description: 'obj8' },
      { id: '9', type: FunctionIdentifier.KO, description: 'obj9' },
      { id: '10', type: FunctionIdentifier.EC, description: 'ob10' },
      { id: '11', type: FunctionIdentifier.EC, description: 'obj11' },
      { id: '12', type: FunctionIdentifier.KO, description: 'obj12' },
    ]
    this.setFunctionData(this.functionJSON.functionData.sort((a, b) => a.description.localeCompare(b.description)));
    this.selectedFunctionRow = new FunctionDataObject();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setFunctionData(data: FunctionDataObject[]) {
    this.dataSource.data = data;
  }

  applyFilter() {
    let regExp = new RegExp(this.filterString, 'i');
    let newData = this.functionJSON.functionData.filter(keyword => regExp.test(keyword.description));
    this.setFunctionData(newData);
  }

  //TODO determine by which other categories data may be sorted
  sortBy(category: string) {
    let sortedData: FunctionDataObject[] = [];
    switch (category) {
      case 'description': {
        sortedData = this.dataSource.data.sort((a, b) => a.description.localeCompare(b.description))
        break;
      }
    }
    this.setFunctionData(sortedData);
  }

  onClick(row: FunctionDataObject): void {
    this.selectedFunctionRow = row;
  }
}
