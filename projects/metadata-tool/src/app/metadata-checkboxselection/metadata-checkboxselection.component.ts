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
  section1Data = [
    {data: "Counter", title: "counter", type: 'numeric'},
    {data: "Sourcename", title: "source name", type: 'text'},
    {data: "ProjectIdentifier", title: "Project identifier", type: "text"},
    {data: "Study", title: "study", type: "text"},
    {data: "Project", title: "project", type: "text"},
    {data: "Program", title: "program", type: "text"},
  ];

  section2Data = [
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
 
  section3Data = [  
  {data: "AssayName", title: "assay name", type: "text"},
  {data: "ExperimentType", title: "experiment type", type: "text"},
  {data: "TechnologyType", title: "technology type", type: "text"},];

  section4Data = [
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

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      section1: new FormArray([]),
      section2: new FormArray([]),
      section3: new FormArray([]),
      section4: new FormArray([]),
    });

    this.addCheckboxes(this.section1Data, this.form.get('section1') as FormArray);
    this.addCheckboxes(this.section2Data, this.form.get('section2') as FormArray);
    this.addCheckboxes(this.section3Data, this.form.get('section3') as FormArray);
    this.addCheckboxes(this.section4Data, this.form.get('section4') as FormArray);
  }

  private addCheckboxes(data: any[], formArray: FormArray) {
    data.forEach(() => formArray.push(new FormControl(false)));
  }


  submit() {
    const selectedColumnsSection1 = this.getSelectedColumns(this.form.get('section1') as FormArray, this.section1Data);
    const selectedColumnsSection2 = this.getSelectedColumns(this.form.get('section2') as FormArray, this.section2Data);
    const selectedColumnsSection3 = this.getSelectedColumns(this.form.get('section3') as FormArray, this.section3Data);
    const selectedColumnsSection4 = this.getSelectedColumns(this.form.get('section4') as FormArray, this.section4Data);
  
    const mergedSelection = [
      ...selectedColumnsSection1,
      ...selectedColumnsSection2,
      ...selectedColumnsSection3,
      ...selectedColumnsSection4
    ];
  
    console.log(mergedSelection);
  }
  
  private getSelectedColumns(formArray: FormArray, data: any[]) {
    return formArray.controls
      .map((control, index) => control.value ? data[index] : null)
      .filter((column) => column !== null);
  }

  get section1Controls() {
    return (this.form.get('section1') as FormArray).controls;
  }

  get section2Controls() {
    return (this.form.get('section2') as FormArray).controls;
  }

  get section3Controls() {
    return (this.form.get('section3') as FormArray).controls;
  }

  get section4Controls() {
    return (this.form.get('section4') as FormArray).controls;
  }
}