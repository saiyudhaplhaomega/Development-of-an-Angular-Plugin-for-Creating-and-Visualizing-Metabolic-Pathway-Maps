import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  CustomValidators,
  InputFormComponent,
  ALLOWEDSIMPLECHARS,
} from 'shared-lib';
import { Endpoints } from '../../../models/endpoints.model';
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
  formModel: OverviewInputForm;

  groupSelectionOptions = Object.values(GroupSelectionOptions);

  constructor(public builder: FormBuilder, private workflow: WorkflowService) {
    super(builder);

    this.formDisabled$ = new BehaviorSubject<Boolean>(false);
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.formModel = this.buildForm();
    this.setExistingFormInput();
    this.doSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  get groupSelectionOption() {
    return this.formModel?.controls.groupSelectionOptions;
  }

  get groups() {
    return this.formModel?.controls.groups;
  }

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
        [
          CustomValidators.conditionalValidator(
            () =>
              this.groupSelectionOption?.value ===
              this.groupSelectionOptions[0],
            Validators.compose([
              Validators.required,
              Validators.pattern(ALLOWEDSIMPLECHARS),
            ])
          ),
        ],
      ],
      groupStart: [
        undefined,
        [
          CustomValidators.conditionalValidator(
            () =>
              this.groupSelectionOption?.value ===
              this.groupSelectionOptions[1],
            Validators.compose([Validators.required, Validators.min(0)])
          ),
        ],
      ],
      groupEnd: [
        undefined,
        [
          CustomValidators.conditionalValidator(
            () =>
              this.groupSelectionOption?.value ===
              this.groupSelectionOptions[1],
            Validators.compose([Validators.required, Validators.min(0)])
          ),
        ],
      ],
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

  submitOverviewConfig() {
    this.disableForm();
    const overviewConfig = this.formModel.getRawValue();
    this.workflow.submitConfig(overviewConfig, Endpoints.OVERVIEW_INPUT);
    this.submit.emit();
  }

  resetForm() {
    this.formModel.reset({
      groupSelectionOption: this.groupSelectionOptions[0],
    });
  }

  doSubscriptions() {
    this.subscriptions.push(
      this.groupSelectionOption.valueChanges.subscribe(() => {
        CustomValidators.updateValidators(this.groups);
      })
    );

    const pairedValidity = this.subscriptions.push(
      this.groups.valueChanges.subscribe(() => {
        CustomValidators.updateValidators(this.groups);
        // console.log('changed');
      })
    );

    this.subscriptions.push(
      this.formDisabled$.subscribe((disabled) => {
        disabled ? this.formModel.disable() : this.formModel.enable();
      })
    );
  }

  setExistingFormInput() {
    if (this.workflow.ofsData.configData.overviewConfig) {
      this.formModel.patchValue(
        this.workflow.ofsData.configData.overviewConfig
      );
      this.disableForm();
    }
  }

  isLoading(): Boolean {
    return this.workflow.loading;
  }
}
