import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CheckboxSelectionService } from './checkboxselectionservice';
import { MetaDataService } from '../../services/metaddata-input.service';

@Component({
  selector: 'app-checkboxselection',
  templateUrl: './metadata-checkboxselection.component.html',
  styleUrls: ['./metadata-checkboxselection.component.scss'],
})
export class MetaDataCheckboxSelectionComponent {
  form: FormGroup;

  static notSelectableProperties1 = [
  
    { data: 'sourcename', title: 'source name', type: 'text' },
    { data: 'projectIdentifier', title: 'project identifier', type: 'text' },

  ];

  selectableProperties1 = [
    {
      data: 'study',
      title: 'study',
      type: 'text',
      description: 'This is a Study',
    },
    { data: 'project', title: 'project', type: 'text' },
    { data: 'program', title: 'program', type: 'text' },
    { data: 'group', title: 'group', type: 'text' },
  ];

  static notSelectableCharacteristic = [
    {
      data: 'biologicalReplicate',
      title: 'biological replicate',
      type: 'text',
    },
    {
      data: 'metagenomes',
      title: 'metagenomes',
      editor: 'select',
      selectOptions: [
        'ecological metagenomes',
        'organismal metagenomes',
        'synthetic metagenome',
      ],
      strict: true,
    },
  ];

  selectableCharacteristic = [
    {
      data: 'ecologicalMetagenomes',
      title: 'ecological metagenomes',
      type: 'text',
    },
    {
      data: 'organismalMetagenomes',
      title: 'organismal metagenomes',
      type: 'text',
    },
    {
      data: 'syntheticMetagenome',
      title: 'synthetic metagenome',
      type: 'text',
    },
    {
      data: 'analyticalFraction',
      title: 'analytical fraction metagenomes',
      type: 'text',
    },
    {
      data: 'temperatureCondtions',
      title: 'temperature condtions',
      type: 'text',
    },
    { data: 'pressure', title: 'pressure', type: 'text' },
    { data: 'pH', title: 'pH', type: 'text' },
    { data: 'carbonSource', title: 'carbon Source', type: 'text' },
    { data: 'electronSource', title: 'electron Source', type: 'text' },
    {
      data: 'countIdentifiedSpezies',
      title: 'count identified spezies',
      type: 'text',
    },
  ];

  static notSelectableProperties2 = [
    { data: 'assayName', title: 'assay name', type: 'text' },
    { data: 'experimentType', title: 'experiment type', type: 'text' },
  ];

  selectableProperties2 = [
    { data: 'technologyType', title: 'technology type', type: 'text' },
  ];

  static notSelectableComments1 = [
    { data: 'technicalReplicate', title: 'technical replicate', type: 'text' },
    { data: 'label', title: 'label', type: 'text' },
  ];

  selectableComments = [
    { data: 'fractionIdentifier', title: 'fraction identifier', type: 'text' },
    { data: 'spectrumFile', title: 'spectrum file', type: 'text' },
    {
      data: 'cleavantAgentDetails',
      title: 'cleavant agent details',
      type: 'text',
    },
    { data: 'instrument', title: 'instrument', type: 'text' },
    {
      data: 'modificationParameters',
      title: 'modification parameters',
      type: 'text',
    },
    {
      data: 'modificationParameters1',
      title: 'modification parameters.1',
      type: 'text',
    },
    {
      data: 'modificationParameters2',
      title: 'modification parameters.2',
      type: 'text',
    },
    { data: 'dissociationMethod', title: 'dissociation method', type: 'text' },
    {
      data: 'precursorMassTolerance',
      title: 'precursor mass tolerance',
      type: 'text',
    },
    {
      data: 'fragmentMassTolerance',
      title: 'fragment mass tolerance',
      type: 'text',
    },
    { data: 'psm file', title: 'psm file', type: 'text' },
  ];

  static notSelectableComments2 = [
    { data: 'dataFile', title: 'data file', type: 'text' },
    { data: 'fileUri', title: 'file uri', type: 'text' },
    { data: 'mzID', title: 'mzID', type: 'text' },
    { data: 'mzML', title: 'mzML', type: 'text' },
  ];

  static factorValue = [
    { data: 'factorValue', title: 'factor value', type: 'text' },
  ];
  static identID = [
  {
    data: 'identID',
    title: 'identID',
    type: 'text',
    description: 'This is a Test',
  }]

  selectableProperties1Counter: number = 0;
  selectableCharacteristicCounter: number = 0;
  selectableProperties2Counter: number = 0;
  selectableCommentsCounter: number = 0;

  public static mergedSelection = [
    ...MetaDataCheckboxSelectionComponent.notSelectableProperties1,
    ...MetaDataCheckboxSelectionComponent.notSelectableCharacteristic,
    ...MetaDataCheckboxSelectionComponent.notSelectableProperties2,
    ...MetaDataCheckboxSelectionComponent.notSelectableComments1,
    ...MetaDataCheckboxSelectionComponent.notSelectableComments2,
    ...MetaDataCheckboxSelectionComponent.factorValue,
    ...MetaDataCheckboxSelectionComponent.identID,
  ];

  selectables = [
    {
      data: this.selectableProperties1,
      count: this.selectableProperties1Counter,
      title: 'General Information 1',
      formArrayName: 'properties1',
    },
    {
      data: this.selectableProperties2,
      count: this.selectableCharacteristicCounter,
      title: 'General Information 2',
      formArrayName: 'properties2',
    },
    {
      data: this.selectableComments,
      count: this.selectableProperties2Counter,
      title: 'Comments',
      formArrayName: 'comments',
    },
    {
      data: this.selectableCharacteristic,
      count: this.selectableCommentsCounter,
      title: 'Characteristic',
      formArrayName: 'characteristic',
    },
  ];

  @Output() continueClicked = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private checkboxService: CheckboxSelectionService,
  ) {
    this.form = this.formBuilder.group({
      properties1: new FormArray([]),
      characteristic: new FormArray([]),
      properties2: new FormArray([]),
      comments: new FormArray([]),
    });

    // Add checkboxes and initialize counters
    this.addCheckboxes(
      this.selectableProperties1,
      this.form.get('properties1') as FormArray,
      this.selectableProperties1Counter
    );
    this.addCheckboxes(
      this.selectableCharacteristic,
      this.form.get('characteristic') as FormArray,
      this.selectableCharacteristicCounter
    );
    this.addCheckboxes(
      this.selectableProperties2,
      this.form.get('properties2') as FormArray,
      this.selectableProperties2Counter
    );
    this.addCheckboxes(
      this.selectableComments,
      this.form.get('comments') as FormArray,
      this.selectableCommentsCounter
    );

    // Subscribe to value changes for each form control
    this.form
      .get('properties1')
      .valueChanges.subscribe(() => this.submitOnChange('properties1'));

    this.form
      .get('characteristic')
      .valueChanges.subscribe(() => this.submitOnChange('characteristic'));

    this.form
      .get('properties2')
      .valueChanges.subscribe(() => this.submitOnChange('properties2'));

    this.form
      .get('comments')
      .valueChanges.subscribe(() => this.submitOnChange('comments'));
  }

  private addCheckboxes(data: any[], formArray: FormArray, counter: number) {
    data.forEach(() => {
      formArray.push(new FormControl(false));
    });
    counter = formArray.controls.filter((control) => control.value).length;
    // Update the counter via the service
    this.updateCounter(formArray, counter);
  }

  submitOnChange(section: string) {
    const formArray = this.form.get(section) as FormArray;
    this.updateCounter(
      formArray,
      formArray.controls.filter((control) => control.value).length
    );
    this.submit();
  }

  submit() {
    const selectedColumnsProperties1 = this.getSelectedColumns(
      this.form.get('properties1') as FormArray,
      this.selectableProperties1
    );
    const selectedColumnsCharacteristic = this.getSelectedColumns(
      this.form.get('characteristic') as FormArray,
      this.selectableCharacteristic
    );
    const selectedColumnsProperties2 = this.getSelectedColumns(
      this.form.get('properties2') as FormArray,
      this.selectableProperties2
    );
    const selectedColumnsComments = this.getSelectedColumns(
      this.form.get('comments') as FormArray,
      this.selectableComments
    );

    const mergedSelection = [
      ...MetaDataCheckboxSelectionComponent.notSelectableProperties1,
      ...selectedColumnsProperties1,
      ...MetaDataCheckboxSelectionComponent.notSelectableCharacteristic,
      ...selectedColumnsCharacteristic,
      ...MetaDataCheckboxSelectionComponent.notSelectableProperties2,
      ...selectedColumnsProperties2,
      ...MetaDataCheckboxSelectionComponent.notSelectableComments1,
      ...selectedColumnsComments,
      ...MetaDataCheckboxSelectionComponent.notSelectableComments2,
      ...MetaDataCheckboxSelectionComponent.factorValue,
    ];

    this.checkboxService.updateMergedSelection(mergedSelection);
    this.continueClicked.emit();
  }

  private getSelectedColumns(formArray: FormArray, data: any[]) {
    return formArray.controls
      .map((control, index) => (control.value ? data[index] : null))
      .filter((column) => column !== null);
  }

  get properties1Controls() {
    return (this.form.get('properties1') as FormArray).controls;
  }

  get characteristicControls() {
    return (this.form.get('characteristic') as FormArray).controls;
  }

  get properties2Controls() {
    return (this.form.get('properties2') as FormArray).controls;
  }

  get commentsControls() {
    return (this.form.get('comments') as FormArray).controls;
  }

  updateCounters(section: string) {
    const formArray = this.form.get(section) as FormArray;
    const counter = formArray.controls.filter(
      (control) => control.value
    ).length;
    switch (section) {
      case 'properties1':
        this.selectableProperties1Counter = formArray.controls.filter(
          (control) => control.value
        ).length;
        this.checkboxService.updateProperties1Counter(counter);
        break;
      case 'characteristic':
        this.selectableCharacteristicCounter = formArray.controls.filter(
          (control) => control.value
        ).length;
        this.checkboxService.updateCharacteristicCounter(counter);
        break;
      case 'properties2':
        this.selectableProperties2Counter = formArray.controls.filter(
          (control) => control.value
        ).length;
        this.checkboxService.updateProperties2Counter(counter);
        break;
      case 'comments':
        this.selectableCommentsCounter = formArray.controls.filter(
          (control) => control.value
        ).length;
        this.checkboxService.updateCommentsCounter(counter);
        break;
      default:
        break;
    }
  }

  private updateCounter(formArray: FormArray, counter: number) {
    counter = formArray.controls.filter((control) => control.value).length;

    if (formArray === this.form.get('properties1')) {
      this.checkboxService.updateProperties1Counter(counter);
    } else if (formArray === this.form.get('characteristic')) {
      this.checkboxService.updateCharacteristicCounter(counter);
    } else if (formArray === this.form.get('properties2')) {
      this.checkboxService.updateProperties2Counter(counter);
    } else if (formArray === this.form.get('comments')) {
      this.checkboxService.updateCommentsCounter(counter);
    }
  }
}
