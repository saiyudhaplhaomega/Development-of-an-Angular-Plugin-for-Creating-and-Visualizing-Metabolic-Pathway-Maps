// SDRFTableComponent.stories.ts
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetadataWorkflowComponent } from '../app/metadata-workflow/metadata-workflow.component';
import { moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';



export default {
  title: 'Project/SDRF Table Component',
  component: MetadataWorkflowComponent,
  decorators: [
    moduleMetadata({
      declarations: [MetadataWorkflowComponent],
      imports: [
        HttpClientModule, // Add this line
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        // any other modules that your component requires
      ],
    }),
  ],
};
const Template = (args) => ({
  props: args,
  // ... other template setup
});

export const Default = Template.bind({});
Default.args = {
  // ... args setup
};
