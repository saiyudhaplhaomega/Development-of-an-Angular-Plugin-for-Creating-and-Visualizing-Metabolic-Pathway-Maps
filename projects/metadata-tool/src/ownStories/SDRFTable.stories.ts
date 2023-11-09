import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetadataWorkflowComponent } from '../app/metadata-workflow/metadata-workflow.component';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';


const meta: Meta = {
  title: 'Project/SDRF Table Component',
  component: MetadataWorkflowComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(OAuthModule.forRoot()),
        importProvidersFrom(MatDialogModule),
        // ...any other modules that your component requires
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<typeof MetadataWorkflowComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
  }),
};
