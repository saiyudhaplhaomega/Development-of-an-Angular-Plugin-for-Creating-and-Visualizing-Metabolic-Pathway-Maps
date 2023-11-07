// Import the necessary decorators and modules from Storybook and Angular
import { Meta, moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { MetadataUploadpageComponent } from '../app/metadata-uploadpage/metadata-uploadpage.component';

export default {
  title: 'Project/File Upload Component',
  component: MetadataUploadpageComponent,
  decorators: [
    moduleMetadata({
      // If your component uses additional modules, declare them here
      imports: [MatButtonModule],
      // If your component uses services or other components, declare them here
      declarations: [MetadataUploadpageComponent],
      // Add any necessary providers here
      // providers: [...],
    }),
  ],
} as Meta;

// Template function to define how the component should be rendered
const Template= (args) => ({
  props: args,
});

// Default story using the Template function
export const Default = Template.bind({});
Default.args = {
  // If your component takes inputs, provide default values here
};
