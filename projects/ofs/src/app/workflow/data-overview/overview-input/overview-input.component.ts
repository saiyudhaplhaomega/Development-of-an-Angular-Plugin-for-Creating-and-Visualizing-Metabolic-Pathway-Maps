import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators, InputFormComponent } from 'shared-ui-lib';
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

  dataFileControl: FormControl<File | null>;
  dataFile: File | null = null;

  groupSelectionOptions = Object.values(GroupSelectionOptions);
  allowedChars = '^[a-zA-Z0-9_.-]*$';

  constructor(public builder: FormBuilder, private workflow: WorkflowService) {
    super(builder);
  }

  ngOnInit(): void {
    this.dataFileControl = new FormControl(this.dataFile, {
      updateOn: 'change',
      validators: Validators.required,
    });

    this.formModel = this.builder.group(
      {
        data: this.dataFileControl,
        groupSelectionOption: [this.groupSelectionOptions[0]],
        groups: this.builder.array([this.buildGroup(), this.buildGroup()]),
      },
      {
        updateOn: 'blur',
      }
    ) as OverviewInputForm;

    this.validatorSubscription =
      this.groupSelectionOption.valueChanges.subscribe(() => {
        CustomValidators.updateValidators(this.groups);
      });
  }

  ngOnDestroy(): void {
    this.validatorSubscription.unsubscribe();
  }

  get groupSelectionOption() {
    return this.formModel?.controls.groupSelectionOption;
    // this.formModel?.get('groupSelectionOption').value;
  }

  get groups() {
    return this.formModel?.controls.groups;
  }

  buildGroup(): DataGroupForm {
    return this.builder.group({
      groupName: [
        'control',
        [Validators.required, Validators.pattern(this.allowedChars)],
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
              Validators.pattern(this.allowedChars),
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
    this.groups.push(this.buildGroup());
  }

  removeGroup(index: number) {
    if (this.groups.length > 2) {
      this.groups.removeAt(index);
    }
  }

  submitOverviewConfig() {
    const overViewConfig = this.formModel.getRawValue();
    this.workflow.submitOverviewInput(overViewConfig);
  }
}
