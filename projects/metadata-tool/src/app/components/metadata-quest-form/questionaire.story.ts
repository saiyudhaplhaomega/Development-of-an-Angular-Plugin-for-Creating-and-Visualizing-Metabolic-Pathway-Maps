// Import necessary decorators and modules from Storybook and Angular
import { MetadataQuestFormModule } from './metadata-quest.module'; // Adjust the path as needed
import { Meta, StoryObj } from '@storybook/angular';
import { MetadataQuestFormComponent } from './metadata-quest.component';
import { moduleMetadata } from '@storybook/angular';


const meta: Meta<MetadataQuestFormComponent> = {
  title: 'Project/Questionnaire',
  component: MetadataQuestFormComponent,
  tags: ['autodocs'],
  render: () => ({
    props: {
      model: {}, // Initialize with an empty model or a mock model as per your requirement
      // Include other necessary props if there are any
    },
  }),
  decorators: [
    moduleMetadata({
      imports: [MetadataQuestFormModule],
      // No need to individually declare components or providers here,
      // since they are all included in the module.
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof MetadataQuestFormComponent>;

export const Default: Story = {


};
