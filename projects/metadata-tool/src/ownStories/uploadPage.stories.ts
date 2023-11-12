import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { MetadataUploadpageComponent } from '../app/components/upload-container/metadata-uploadpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MatDialogModule } from '@angular/material/dialog';

export default {
  title: 'Project/File Upload Component',
  component: MetadataUploadpageComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(MatButtonModule),
        importProvidersFrom(OAuthModule.forRoot()),
        importProvidersFrom(MatDialogModule),
      ],
    }),
  ],
} as Meta;

type Story = StoryObj<typeof MetadataUploadpageComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
  }),
};
