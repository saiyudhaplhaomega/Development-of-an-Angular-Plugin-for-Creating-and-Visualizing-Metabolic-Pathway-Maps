// based of this concept: https://dev.to/sp90/angular-reactive-forms-conditional-validation-4aop
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MetadataQuestFormComponent } from './metadata-quest.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatStepperModule } from '@angular/material/stepper';
import { FormlyFieldStepper } from './stepper.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MetadataQuestFormComponent, FormlyFieldStepper],
  imports: [
    // base imports
    CommonModule,
    ReactiveFormsModule,

    // formly imports
    FormlyModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [{ name: 'stepper', component: FormlyFieldStepper, wrappers: [] }],
    }),

    //material design imports
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatTooltipModule,
    MatIconModule,
  ],
  exports: [
    MetadataQuestFormComponent,
    FormlyFieldStepper, // Export if it will be used outside the module
  ],
})
export class MetadataQuestFormModule {} // Make sure this matches the class name exactly
