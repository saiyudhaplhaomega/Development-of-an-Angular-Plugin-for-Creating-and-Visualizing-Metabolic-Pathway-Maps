import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  CustomValidators,
  InputFormComponent,
  ALLOWEDSIMPLECHARS,
} from 'shared-lib';
import { OFSData } from '../../models/ofs-data.model';
import {
  DataGroupForm,
  GroupSelectionOptions,
  OverviewInputForm,
} from '../../models/overview.model';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'ofs-overview-input',
  templateUrl: './overview-input.component.html',
  styleUrls: ['./overview-input.component.scss'],
})
export class OverviewInputComponent
  extends InputFormComponent
  implements OnInit, OnDestroy
{
  groupSelectionOptions = Object.values(GroupSelectionOptions);
  formModel: OverviewInputForm;

  constructor(public builder: FormBuilder, private workflow: WorkflowService) {
    super(builder);

    this.subscriptions = [];
  }

  // Getters and Setters
  get groups() {
    return this.formModel?.controls.groups;
  }

  //  Lifecycle Hooks
  ngOnInit(): void {
    this.formModel = this.buildForm();
    this.doSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  //  Subscriptions
  doSubscriptions() {
    // updates Validators if form value changed, necessary to check for duplicate names (see arrayDuplicateValidator)
    this.subscriptions.push(
      this.groups.valueChanges.subscribe(() => {
        CustomValidators.updateValidators(this.groups);
      })
    );

    // form depends on values in ofsdata - react to changes
    this.subscriptions.push(
      this.workflow.ofsData$.subscribe((ofsData) => {
        this.setExistingFormInput(ofsData);
      })
    );
  }

  // check if ofsdata contains values relevant to this form
  setExistingFormInput(ofsData: OFSData) {
    const overviewConfig = ofsData.configData.overviewConfig;
    if (overviewConfig?.groups !== undefined) {
      //  yes: update form values and disable changes
      this.formModel.patchValue(overviewConfig);
      this.disableForm();
      return;
    }
    // no: allow changes of form
    this.enableForm();
  }

  //  Methods
  buildForm(): OverviewInputForm {
    let dataFile: File | null;

    const dataFileControl = new FormControl(dataFile, {
      updateOn: 'change',
      validators: Validators.required,
    });

    const formModel = this.builder.group(
      {
        data: dataFileControl,
        groupSelectionOptions: [this.groupSelectionOptions[0]],
        groups: this.builder.array(
          [this.buildGroup('control'), this.buildGroup('test')],
          {
            updateOn: 'blur',
            validators: [
              CustomValidators.arrayDuplicateValidator(['groupName']),
            ],
          }
        ),
      },
      {
        updateOn: 'blur',
      }
    ) as OverviewInputForm;

    return formModel;
  }

  buildGroup(defaultName: string): DataGroupForm {
    return this.builder.group({
      groupName: [
        defaultName,
        [Validators.required, Validators.pattern(ALLOWEDSIMPLECHARS)],
      ],
      groupPrefix: [
        '',
        [Validators.required, Validators.pattern(ALLOWEDSIMPLECHARS)],
      ],
      groupStart: [undefined],
      groupEnd: [undefined],
    }) as DataGroupForm;
  }

  addGroup(): void {
    this.groups.push(this.buildGroup(''));
  }

  removeGroup(index: number) {
    if (this.groups.length > 2) {
      this.groups.removeAt(index);
    }
  }

  resetForm() {
    this.formModel = this.buildForm();
  }

  submitOverviewConfig() {
    const overviewConfig = this.formModel.getRawValue();
    this.workflow.submitOverViewConfig(overviewConfig);
  }
}
