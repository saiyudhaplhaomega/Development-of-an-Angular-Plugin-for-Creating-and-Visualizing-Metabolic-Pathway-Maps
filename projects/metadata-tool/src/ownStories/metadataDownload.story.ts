// Import moduleMetadata for Storybook decorators
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {   MetadataDownloadpageComponent } from '../app/pages/metadata-download-page/metadata-downloadpage.component';
import { MetadataDownloadpageModule } from '../app/pages/metadata-download-page/metadata-downloadpage.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Meta } from '@storybook/angular';


// Mock the action for Storybook
const mockDownloadFile = action('Download button clicked');
export default {
  title: 'Project/MetadataDownloadPageComponent',
  component: MetadataDownloadpageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        // Since the component is part of the module's declarations and exports,
        // you can import the module directly if no lazy-loaded routes are involved
        MetadataDownloadpageModule,
        RouterTestingModule.withRoutes([]), // Add mock routes if necessary
        // MatButtonModule is already imported as part of MetadataDownloadpageModule
      ],
    }),
  ],
} as Meta;

const Template = (args) => ({
  component: MetadataDownloadpageComponent,
  props: {
    ...args,
    downloadFile: mockDownloadFile,
  },
});

// If MetadataDownloadpageComponent relies on input properties, provide default values
export const Default = Template.bind({});
Default.args = {
  // Example: fileUrl: 'url-to-file-for-download'
};
