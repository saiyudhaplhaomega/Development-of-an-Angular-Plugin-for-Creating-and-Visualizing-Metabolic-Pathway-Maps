import { outputAst } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
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
  @Output() submit = new EventEmitter<any>();

  formModel: OverviewInputForm;
  formDisabled$: BehaviorSubject<Boolean>;

  dataFileControl: FormControl<File | null>;
  dataFile: File | null;

  groupSelectionOptions = Object.values(GroupSelectionOptions);
  allowedChars = '^[a-zA-Z0-9_.-]*$';

  subscriptions: Subscription[];

  constructor(public builder: FormBuilder, private workflow: WorkflowService) {
    super(builder);

    this.formDisabled$ = new BehaviorSubject<Boolean>(false);
    this.subscriptions = [];
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
        groups: this.builder.array([
          this.buildGroup('control'),
          this.buildGroup('test'),
        ]),
      },
      {
        updateOn: 'blur',
      }
    ) as OverviewInputForm;

    this.subscriptions.push(
      this.groupSelectionOption.valueChanges.subscribe(() => {
        CustomValidators.updateValidators(this.groups);
      })
    );

    this.subscriptions.push(
      this.formDisabled$.subscribe((disabled) => {
        disabled ? this.formModel.disable() : this.formModel.enable();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  get groupSelectionOption() {
    return this.formModel?.controls.groupSelectionOption;
    // this.formModel?.get('groupSelectionOption').value;
  }

  get groups() {
    return this.formModel?.controls.groups;
  }

  buildGroup(defaultName: string): DataGroupForm {
    return this.builder.group({
      groupName: [
        defaultName,
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
    this.groups.push(this.buildGroup(''));
  }

  removeGroup(index: number) {
    if (this.groups.length > 2) {
      this.groups.removeAt(index);
    }
  }

  submitOverviewConfig() {
    this.disableForm();
    const overViewConfig = this.formModel.getRawValue();
    this.workflow.submitOverviewInput(overViewConfig);
    this.submit.emit();
  }

  disableForm() {
    this.formDisabled$.next(true);
  }

  enableForm() {
    this.formDisabled$.next(false);
  }

  isLoading(): Boolean {
    return this.workflow.loading;
  }
}
