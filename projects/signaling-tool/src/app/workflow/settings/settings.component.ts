/*  import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/dataservice.service';
import { Data } from './custom-form-data.interface'; // Import the custom interface //dosya adı değişecek buna dikkat et!! 

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  formData: CustomFormData = {} as CustomFormData; // Initialize formData with default values
  settings: string[] = Object.keys(this.formData);

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    // Create form controls for each setting property
    const formControls = {};
    this.settings.forEach((setting) => {
      formControls[setting] = [false]; // Initialize each control with a default value (e.g., false)
    });

    this.settingsForm = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      // Transfer the form inputs to the formData object
      const formData: CustomFormData = this.settingsForm.value;
      this.formData = formData;
      this.dataService.setFormData(formData);
    }
  }
}  */  

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; 
import {MatSort, Sort, MatSortModule} from '@angular/material/sort'; 
import { HttpClient } from '@angular/common/http'; 
import { Data } from './interfaces';  
import {LiveAnnouncer} from '@angular/cdk/a11y'; 


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  displayedColumns: string[] = [
    'molecule', 'value'
  ];
  //data: any[] = [];
  dataData = new MatTableDataSource<any>(); 
 
  testData = [ 
    { molecule: "cd2", 
    value: 0 },  
    {molecule: "itk", 
    value: 0 }, 
    {molecule: "akap79", 
    value: 0 },  
    {molecule: "pkb", 
    value: 0 },  
    {molecule: "jnk", 
    value: 0 },  
    {molecule: "bclxl", 
    value: 0 },  
    {molecule: "gsk3", 
    value: 0 }, 
    {molecule: "tcrlig", 
    value: 0 },   
    {molecule: "pten", 
    value: 0 }, 
    {molecule: "creb", 
    value: 0 },  
    {molecule: "lckp1", 
    value: 0 },  
    {molecule: "dag", 
    value: 0 },  
    {molecule: "cabin1", 
    value: 0 }, 
    {molecule: "fyn", 
    value: 0 }, 
    {molecule: "cd4", 
    value: 0 }, 
    {molecule: "calcin", 
    value: 0 }, 
    {molecule: "calpr1", 
    value: 0 }, 
    {molecule: "sh3bp2", 
    value: 0 },
    {molecule: "ship1", 
    value: 0 },
    {molecule: "bad", 
    value: 0 },
    {molecule: "cre", 
    value: 0 }, 
    {molecule: "x", 
    value: 0 }, 
    {molecule: "rac1p1", 
    value: 0 }, 
    {molecule: "gads", 
    value: 0 }, 
    {molecule: "plcgb", 
    value: 0 },
    {molecule: "card11a", 
    value: 0 }, 
    {molecule: "mlk3", 
    value: 0 }, 
    {molecule: "cyc1", 
    value: 0 }, 
  
 
    

  ]

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: HttpClient) { } 


  ngOnInit() {
    this.getData();
  } 

  ngAfterViewInit() {  
    this.dataData.sort = this.sort;

  }  
  getData(): void {
    this.http.get<Data[]>('./assets/initial_states.json').subscribe(data  => { console.log(data)
    this.dataData.data = this.testData;
    }); 
   
  }
}


