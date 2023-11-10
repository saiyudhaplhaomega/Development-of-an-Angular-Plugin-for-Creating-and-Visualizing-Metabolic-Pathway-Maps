// Import necessary decorators and modules from Storybook and Angular
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MatDialogModule } from '@angular/material/dialog';
import { importProvidersFrom } from '@angular/core';
import { MetadataQuestComponent } from '../app/metadata-quest/metadata-quest.component';


const meta: Meta = {
  title: 'Project/MetadataQuestModule',
  component: MetadataQuestComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(FormsModule),
        importProvidersFrom(ReactiveFormsModule),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(OAuthModule.forRoot()),
        importProvidersFrom(MatDialogModule),
        // ...any other modules that your component requires
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<typeof MetadataQuestComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
  }),
};
