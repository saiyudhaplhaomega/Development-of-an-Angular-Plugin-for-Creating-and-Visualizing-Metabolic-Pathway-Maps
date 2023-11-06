import { Meta, moduleMetadata } from '@storybook/angular';
import {  MetadataLandingPageComponent  } from '../app/metadata-landing-page/metadata-landing-page.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing'; // Make sure to import this

export default {
  title: 'Project/MetadataLandingPageComponent',
  component: MetadataLandingPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [MetadataLandingPageComponent],
      imports: [
        MatButtonModule, // Import Angular Material Button Module
        RouterTestingModule, // Mock routing
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
