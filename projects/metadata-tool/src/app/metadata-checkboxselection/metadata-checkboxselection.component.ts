import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-checkboxselection',
  templateUrl: './metadata-checkboxselection.component.html',
  styleUrls: ['./metadata-checkboxselection.component.scss']
})
export class MetaDataCheckboxSelectionComponent {

  form: FormGroup;
  columnsData = [
    {data: "Counter", title: "counter", type: 'numeric'},
    {data: "Sourcename", title: "source name", type: 'text'},
    {data: "ProjectIdentifier", title: "Project identifier", type: "text"},
    {data: "Study", title: "study", type: "text"},
    {data: "Project", title: "project", type: "text"},
    {data: "Program", title: "program", type: "text"},
  ];

  columnsDataCharacteristic = [
    {data: "BiologicalReplicate", title: "biological replicate", type: "text"},
    {data: "Metagenomes", title: "metagenomes", type: "text"},
    {data: "EcologicalMetagenomes", title: "ecological metagenomes", type: "text"},
    {data: "AnalyticalFraction", title: "analytical fraction metagenomes", type: "text"},
    {data: "TemperatureCondtions", title: "temperature condtions", type: "text"},
    {data: "Pressure", title: "pressure", type: "text"},
    {data: "pH", title: "pH", type: "text"},
    {data: "CarbonSource", title: "carbon Source", type: "text"},
    {data: "ElectronSource", title: "electron Source", type: "text"},
    {data: "CountIdentifiedSpezies", title: "count identified spezies", type: "text"},
  ];
 
  columnsDataThrid = [  
  {data: "AssayName", title: "assay name", type: "text"},
  {data: "ExperimentType", title: "experiment type", type: "text"},
  {data: "TechnologyType", title: "technology type", type: "text"},];

  columnsDataComment = [
    {data: "TechnicalReplicate", title: "technical replicate", type: "text"},
    {data: "Label", title: "label", type: "text"},
    {data: "FractionIdentifier", title: "fraction identifier", type: "text"},
    {data: "CleavantAgentDetails", title: "cleavant agent details", type: "text"},
    {data: "Instrument", title: "instrument", type: "text"},
    {data: "ModificationParameters", title: "modification parameters", type: "text"},
    {data: "ModificationParameters1", title: "modification parameters.1", type: "text"},
    {data: "ModificationParameters2", title: "modification parameters.2", type: "text"},
    {data: "DissociationMethod", title: "dissociation method", type: "text"},
    {data: "PrecursorMassTolerance", title: "precursor mass tolerance", type: "text"},
    {data: "FragmentMassTolerance", title: "fragment mass tolerance", type: "text"},
    {data: "DataFile", title: "data file", type: "text"},
    {data: "FileUri", title: "file uri", type: "text"},
    {data: "mzID", title: "mzID", type: "text"},
    {data: "mzML", title: "mzML", type: "text"},
    {data: "Comment", title: "comment", type: "text"},
    {data: "FactorValue", title: "factor value", type: "text"},
  ];

  


  get columnsControls() {
    return (this.form.get('columns') as FormArray).controls;
  }

  get ordersFormArray() {
    return this.form.get('columns') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      columns: new FormArray([])
    });

    this.addCheckboxes(); // Call addCheckboxes after initializing form
  }

  private addCheckboxes() {
    this.columnsData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }


  submit() {
    const selectedColumns = this.form.value.columns
      .map((checked: boolean, i: number) => checked ? this.columnsData[i] : null)
      .filter((column: any) => column !== null);

    console.log(selectedColumns);

  }

}
