// based of this concept: https://dev.to/sp90/angular-reactive-forms-conditional-validation-4aop
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MetadataQuestFormComponent } from './metadata-quest.component';
import { MetadataQuestRoutingModule } from './metadata-quest-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatStepperModule } from '@angular/material/stepper';
import { FormlyFieldStepper } from './stepper.type';

@NgModule({
  declarations: [MetadataQuestFormComponent, FormlyFieldStepper],
  imports: [
    // base imports
    CommonModule,
    ReactiveFormsModule,

    //material design imports
    MetadataQuestRoutingModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormlyModule,
    FormlyMaterialModule,
    MatStepperModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [{ name: 'stepper', component: FormlyFieldStepper, wrappers: [] }],
    }),
  ],
  exports: [
    MetadataQuestFormComponent,
    FormlyFieldStepper, // Export if it will be used outside the module
  ],
})
export class MetadataQuestModule {} // Make sure this matches the class name exactly
