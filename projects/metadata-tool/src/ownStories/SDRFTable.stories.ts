import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetadataWorkflowComponent } from '../app/metadata-workflow/metadata-workflow.component';
import { applicationConfig } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientService } from 'shared-lib';
import { importProvidersFrom } from '@angular/core';

export default {
  title: 'Project/SDRF Table Component',
  component: MetadataWorkflowComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
        // Any other modules that your component requires
      ],
    }),
  ],
};

const Template = (args) => ({
  props: args,
  applicationConfig: {
    providers: [
      // Provide HttpClientService, which will use HttpClient from HttpClientModule
      HttpClientService,
      // Any other services that need to be provided
    ],
  },
  // ... other template setup
});

export const Default = Template.bind({});
Default.args = {
  // ... args setup
};
