// https://formly.dev/docs/examples/advanced/multi-step-form/

import { Component, ViewChild } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { FieldType, FormlyFieldConfig } from "@ngx-formly/core";

@Component({
  selector: "formly-field-stepper",
  template: `
    <mat-horizontal-stepper>
      <mat-step
        *ngFor="
          let step of field.fieldGroup;
          let index = index;
          let last = last
        "
      >
        <ng-template matStepLabel>{{ step.props.label }}</ng-template>

        <div *ngFor="let subfield of step.fieldGroup">
          <div class="field-with-icon">
            <formly-field [field]="subfield"></formly-field>
          </div>
        </div>

        <div>
          <!-- Navigation buttons: Back, Next, Submit -->
          <button
            mat-raised-button
            matStepperPrevious
            *ngIf="index !== 0"
            class="btn btn-primary"
            type="button"
            (click)="goToPreviousStep()"
          >
            Back
          </button>

          <button
            mat-raised-button
            matStepperNext
            *ngIf="!last"
            class="btn btn-primary"
            type="button"
            (click)="goToNextStep()"
            [disabled]="!isValid(step)"
          >
            Next
          </button>

          <button
            mat-raised-button
            *ngIf="last"
            class="btn btn-primary"
            [disabled]="!form.valid"
            type="submit"
          >
            Submit
          </button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  `
})
export class FormlyFieldStepper extends FieldType {
  @ViewChild(MatStepper) stepper: MatStepper;
  currentIndex = 0;

  goToNextStep() {
    if (this.isValid(this.field.fieldGroup[this.currentIndex])) {
      this.stepper.next();
      this.currentIndex++;
    }
  }

  goToPreviousStep() {
    this.stepper.previous();
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
  }

  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field.formControl.valid;
    }

    return field.fieldGroup
      ? field.fieldGroup.every((f) => this.isValid(f))
      : true;
  }
}
