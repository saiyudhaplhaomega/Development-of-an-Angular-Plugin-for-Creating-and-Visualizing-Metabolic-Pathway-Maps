// based of this concept: https://dev.to/sp90/angular-reactive-forms-conditional-validation-4aop
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MetadataQuestFormComponent } from "./metadata-quest.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { MatStepperModule } from "@angular/material/stepper";
import { FormlyFieldStepper } from "./stepper.type";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { FormlyWrapperAddons } from "./wrapper/addons.wrapper";
import { addonsExtension } from "./wrapper/addons.extensions";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    MetadataQuestFormComponent,
    FormlyFieldStepper,
    FormlyWrapperAddons
  ],
  imports: [
    // base imports
    CommonModule,
    ReactiveFormsModule,

    // formly imports
    FormlyModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      wrappers: [{ name: "addons", component: FormlyWrapperAddons }],
      extensions: [
        { name: "addons", extension: { onPopulate: addonsExtension } }
      ],
      // wrappers: [ { name: 'tooltip', component: CustomFieldWrapperComponent } ],
      validationMessages: [
        { name: "required", message: "This field is required" }
      ],
      types: [{ name: "stepper", component: FormlyFieldStepper, wrappers: [] }]
    }),

    //material design imports
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    MetadataQuestFormComponent,
    FormlyFieldStepper // Export if it will be used outside the module
  ]
})
export class MetadataQuestFormModule {} // Make sure this matches the class name exactly
