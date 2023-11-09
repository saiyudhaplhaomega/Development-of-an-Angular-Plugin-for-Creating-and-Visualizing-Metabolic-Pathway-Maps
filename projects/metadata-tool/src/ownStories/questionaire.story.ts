import {applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { OAuthModule } from 'angular-oauth2-oidc';
import { importProvidersFrom } from '@angular/core';
import {  MetadataQuestComponent } from '../app/questionnaire/metadata-quest.component';

export default {
  title: 'Project/MetadataQuestComponent',
  component: MetadataQuestComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(FormsModule),
        importProvidersFrom(ReactiveFormsModule),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(MatDialogModule),
        importProvidersFrom(OAuthModule.forRoot()),
        // ...any other modules or providers that your component requires
      ],
    }),
  ],
} as Meta<MetadataQuestComponent>;

export const Default: StoryObj<MetadataQuestComponent> = {
  render: () => ({
    props: {},
    // Here you can add any input props your component might take
  }),
};
