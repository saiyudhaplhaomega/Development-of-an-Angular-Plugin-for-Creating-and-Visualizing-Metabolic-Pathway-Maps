// Import necessary decorators and modules from Storybook and Angular
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MetadataQuestFormComponent } from '../app/components/metadata-quest-form/metadata-quest.component';


const meta: Meta = {
  title: 'Project/MetadataQuestModule',
  component: MetadataQuestFormComponent,
  decorators: [
    applicationConfig({
      providers: [
        //Core modules
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),

        // Base modules
        importProvidersFrom(FormsModule),
        importProvidersFrom(ReactiveFormsModule),
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<typeof MetadataQuestFormComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
  }),
};
