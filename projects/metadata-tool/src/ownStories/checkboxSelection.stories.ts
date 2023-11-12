// CheckboxSelectionComponent.stories.ts
import {
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import {  MetaDataCheckboxSelectionComponent  } from '../app/components/metadata-checkboxselection/metadata-checkboxselection.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

export default {
  title: 'Project/CheckboxSelectionComponent',
  component: MetaDataCheckboxSelectionComponent,
  decorators: [

    applicationConfig({
      providers: [
        //Core modules
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(ReactiveFormsModule),

        // Matirial Design
        importProvidersFrom(MatButtonModule),
        importProvidersFrom(MatCheckboxModule)
      ],
    }),
  ],
};

const Template = (args) => ({
  component: MetaDataCheckboxSelectionComponent,
  props: {
    ...args,
    form: new FormGroup({
      properties1: new FormArray([new FormControl(false)]),
      characteristic: new FormArray([new FormControl(false)]),
      properties2: new FormArray([new FormControl(false)]),
      comments: new FormArray([new FormControl(false)]),
    }),
    selectableProperties1: [{ title: 'Property 1' }],
    selectableCharacteristic: [{ title: 'Characteristic 1' }],
    selectableProperties2: [{ title: 'Property 2' }],
    selectableComments: [{ title: 'Comment 1' }],
  },
  template: args.template,
});

export const Default = Template.bind({});
Default.args = {
  selectableProperties1Counter: 0,
  selectableCharacteristicCounter: 0,
  selectableProperties2Counter: 0,
  selectableCommentsCounter: 0,
  template: `
    <h2>Checkbox Selection for SDRF Table (incomplete)</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <!-- Your content here, similar to your actual component template -->
    </form>
  `,
};
