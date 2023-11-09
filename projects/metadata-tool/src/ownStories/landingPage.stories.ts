import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import {  MetadataLandingPageComponent  } from '../app/metadata-landing-page/metadata-landing-page.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetadataUploadpageComponent } from '../app/metadata-uploadpage/metadata-uploadpage.component';


export default {
  title: 'Project/MetadataLandingPageComponent',
  component: MetadataLandingPageComponent,
  decorators: [
    applicationConfig({
      providers: [
        //Core modules
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),

        // Matirial Design
        importProvidersFrom(MatButtonModule),
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

