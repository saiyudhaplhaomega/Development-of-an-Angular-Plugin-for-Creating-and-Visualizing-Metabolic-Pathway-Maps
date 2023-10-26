import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CheckboxSelectionService } from './checkboxselectionservice';

@Component({
  selector: 'app-checkboxselection',
  templateUrl: './metadata-checkboxselection.component.html',
  styleUrls: ['./metadata-checkboxselection.component.scss'],
})
export class MetaDataCheckboxSelectionComponent {
  form: FormGroup;

  notSelectable1 = [{ data: 'Sourcename', title: 'source name', type: 'text' },
  /// TESTING
  {
    data: 'ExperimentType',
    title: 'experiment type',
    type: 'dropdown',
    source: ['heat shock', 'experiment 2', 'experiment 3', 'experiment 4'],
  },
  {
    data: 'TechnicalReplicate',
    title: 'technical replicate',
    type: 'text',
  },
  {
    data: 'Label',
    title: 'label',
    type: 'autocomplete',
    source: ['Label 1', 'BONCAT', 'SILAC'],
    strict: false,
  },
  {
    data: 'Metagenomes',
    title: 'metagenomes',
    type: 'dropdown',
    source: [
      'experiment 1',
      'experiment 2',
      'experiment 3',
      'experiment 4',
    ],
  },];

  section1Data = [
    { data: 'Sourcename', title: 'source name', type: 'text' },
    { data: 'ProjectIdentifier', title: 'Project identifier', type: 'text' },
    { data: 'Study', title: 'study', type: 'text' },
    { data: 'Project', title: 'project', type: 'text' },
    { data: 'Program', title: 'program', type: 'text' },
  ];

  notSelectable2 = [
    {
      data: 'BiologicalReplicate',
      title: 'biological replicate',
      type: 'text',
    },
    { data: 'Metagenomes', title: 'metagenomes', type: 'text' },
  ];

  section2Data = [
    {
      data: 'EcologicalMetagenomes',
      title: 'ecological metagenomes',
      type: 'text',
    },
    {
      data: 'AnalyticalFraction',
      title: 'analytical fraction metagenomes',
      type: 'text',
    },
    {
      data: 'TemperatureCondtions',
      title: 'temperature condtions',
      type: 'text',
    },
    { data: 'Pressure', title: 'pressure', type: 'text' },
    { data: 'pH', title: 'pH', type: 'text' },
    { data: 'CarbonSource', title: 'carbon Source', type: 'text' },
    { data: 'ElectronSource', title: 'electron Source', type: 'text' },
    {
      data: 'CountIdentifiedSpezies',
      title: 'count identified spezies',
      type: 'text',
    },
  ];

  section3Data = [
    { data: 'AssayName', title: 'assay name', type: 'text' },
    { data: 'ExperimentType', title: 'experiment type', type: 'text' },
    { data: 'TechnologyType', title: 'technology type', type: 'text' },
  ];

  section4Data = [
    { data: 'TechnicalReplicate', title: 'technical replicate', type: 'text' },
    { data: 'Label', title: 'label', type: 'text' },
    { data: 'FractionIdentifier', title: 'fraction identifier', type: 'text' },
    {
      data: 'CleavantAgentDetails',
      title: 'cleavant agent details',
      type: 'text',
    },
    { data: 'Instrument', title: 'instrument', type: 'text' },
    {
      data: 'ModificationParameters',
      title: 'modification parameters',
      type: 'text',
    },
    {
      data: 'ModificationParameters1',
      title: 'modification parameters.1',
      type: 'text',
    },
    {
      data: 'ModificationParameters2',
      title: 'modification parameters.2',
      type: 'text',
    },
    { data: 'DissociationMethod', title: 'dissociation method', type: 'text' },
    {
      data: 'PrecursorMassTolerance',
      title: 'precursor mass tolerance',
      type: 'text',
    },
    {
      data: 'FragmentMassTolerance',
      title: 'fragment mass tolerance',
      type: 'text',
    },
    { data: 'DataFile', title: 'data file', type: 'text' },
    { data: 'FileUri', title: 'file uri', type: 'text' },
    { data: 'mzID', title: 'mzID', type: 'text' },
    { data: 'mzML', title: 'mzML', type: 'text' },
    { data: 'Comment', title: 'comment', type: 'text' },
    { data: 'FactorValue', title: 'factor value', type: 'text' },
  ];

  section1Counter: number = 0;
  section2Counter: number = 0;
  section3Counter: number = 0;
  section4Counter: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private checkboxService: CheckboxSelectionService
  ) {
    this.form = this.formBuilder.group({
      section1: new FormArray([]),
      section2: new FormArray([]),
      section3: new FormArray([]),
      section4: new FormArray([]),
    });

    // Add checkboxes and initialize counters
    this.addCheckboxes(
      this.section1Data,
      this.form.get('section1') as FormArray,
      this.section1Counter
    );
    this.addCheckboxes(
      this.section2Data,
      this.form.get('section2') as FormArray,
      this.section2Counter
    );
    this.addCheckboxes(
      this.section3Data,
      this.form.get('section3') as FormArray,
      this.section3Counter
    );
    this.addCheckboxes(
      this.section4Data,
      this.form.get('section4') as FormArray,
      this.section4Counter
    );
  }

  private addCheckboxes(data: any[], formArray: FormArray, counter: number) {
    data.forEach(() => {
      formArray.push(new FormControl(false));
    });
    // Initialize the counter based on the initially selected checkboxes
    counter = formArray.controls.filter((control) => control.value).length;

    // Update the counter via the service
    this.updateCounter(formArray, counter);
  }

  submit() {
    const selectedColumnsSection1 = this.getSelectedColumns(
      this.form.get('section1') as FormArray,
      this.section1Data
    );
    const selectedColumnsSection2 = this.getSelectedColumns(
      this.form.get('section2') as FormArray,
      this.section2Data
    );
    const selectedColumnsSection3 = this.getSelectedColumns(
      this.form.get('section3') as FormArray,
      this.section3Data
    );
    const selectedColumnsSection4 = this.getSelectedColumns(
      this.form.get('section4') as FormArray,
      this.section4Data
    );

    // Maybe merge is not ideal
    // Better merge later in
    const mergedSelection = [
      ...this.notSelectable1,
      ...selectedColumnsSection1,
      ...this.notSelectable2,
      ...selectedColumnsSection2,
      ...selectedColumnsSection3,
      ...selectedColumnsSection4,
    ];

    this.checkboxService.updateMergedSelection(mergedSelection);
    console.log(mergedSelection);
  }

  private getSelectedColumns(formArray: FormArray, data: any[]) {
    return formArray.controls
      .map((control, index) => (control.value ? data[index] : null))
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
  updateCounters(section: string) {
    const formArray = this.form.get(section) as FormArray;
    const counter = formArray.controls.filter(
      (control) => control.value
    ).length;
    switch (section) {
      case 'section1':
        this.section1Counter = formArray.controls.filter(
          (control) => control.value
        ).length;
        //console.log(`Section 1: ${this.section1Counter} checkboxes selected`);
        this.checkboxService.updateSection1Counter(counter);
        break;
      case 'section2':
        this.section2Counter = formArray.controls.filter(
          (control) => control.value
        ).length;
        //console.log(`Section 2: ${this.section2Counter} checkboxes selected`);
        this.checkboxService.updateSection2Counter(counter);
        break;
      case 'section3':
        this.section3Counter = formArray.controls.filter(
          (control) => control.value
        ).length;
        //console.log(`Section 3: ${this.section3Counter} checkboxes selected`);
        this.checkboxService.updateSection3Counter(counter);
        break;
      case 'section4':
        this.section4Counter = formArray.controls.filter(
          (control) => control.value
        ).length;
        //console.log(`Section 4: ${this.section4Counter} checkboxes selected`);
        this.checkboxService.updateSection4Counter(counter);
        break;
      default:
        break;
    }
  }

  private updateCounter(formArray: FormArray, counter: number) {
    counter = formArray.controls.filter((control) => control.value).length;

    if (formArray === this.form.get('section1')) {
      this.checkboxService.updateSection1Counter(counter);
    } else if (formArray === this.form.get('section2')) {
      this.checkboxService.updateSection2Counter(counter);
    } else if (formArray === this.form.get('section3')) {
      this.checkboxService.updateSection3Counter(counter);
    } else if (formArray === this.form.get('section4')) {
      this.checkboxService.updateSection4Counter(counter);
    }
  }
}
