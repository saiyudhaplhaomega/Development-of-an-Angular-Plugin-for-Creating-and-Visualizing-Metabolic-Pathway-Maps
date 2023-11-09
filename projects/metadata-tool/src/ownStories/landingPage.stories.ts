import { Meta, moduleMetadata } from '@storybook/angular';
import {  MetadataLandingPageComponent  } from '../app/metadata-landing-page/metadata-landing-page.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing'; // Make sure to import this
import { StandardPageLayoutModule } from 'shared-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app/app-routing.module';
import { WorkflowModule } from '../app/metadata-workflow/metadata-workflow.module';
import { MetaDataCheckboxSelectionModule } from '../app/metadata-checkboxselection/metadata-checkboxselection.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MetadataDownloadpageModule } from '../app/metadata-downloadpage/metadata-downloadpage.module';
import { MetadataUploadpageModule } from '../app/metadata-uploadpage/metadata-uploadpage.module';


export default {
  title: 'Project/MetadataLandingPageComponent',
  component: MetadataLandingPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [MetadataLandingPageComponent],
      imports: [
        // Top level
        BrowserModule,
        BrowserAnimationsModule,

        // specific
        RouterTestingModule, // Mock routing
        HttpClientModule,

        // Import other Material modules as needed
      ],
    }),
  ],
} as Meta;

const Template = (args: MetadataLandingPageComponent) => ({
  component: MetadataLandingPageComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  // Define your args here if necessary
};
