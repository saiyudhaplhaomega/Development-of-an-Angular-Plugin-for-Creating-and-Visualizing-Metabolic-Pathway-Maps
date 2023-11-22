import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadataQuestFormComponent } from './metadata-quest.component';
import { MetadataQuestFormModule } from './metadata-quest.module';

export default {
  title: 'Metadata Quest Form',
  component: MetadataQuestFormComponent,
  decorators: [
    moduleMetadata({
      imports: [MetadataQuestFormModule],
    }),
  ],
} as Meta;

const Template: Story<MetadataQuestFormComponent> = (args: MetadataQuestFormComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  // Provide default args for your component here
};

// You can add more stories to represent different states of your component
