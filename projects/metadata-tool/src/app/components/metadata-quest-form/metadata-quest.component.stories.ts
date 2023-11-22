import { Meta, moduleMetadata } from '@storybook/angular';
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

const Template = (args: MetadataQuestFormComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  model: {
    experimentType: 'metaproteomics',
    metagenomes: 'ecological',
    ecologicalMetagenomes: 'gut',
    technologyType: 'shotgun',
    instrument: 'Orbitrap',
    cleavantAgentDetails: 'inGel',
    modificationParameters: 'Trypsin',
    assayName: 'Assay X',
    label: 'Label Y',
    group: 'Group Z',
    project: 'Project Alpha',
    program: 'Program Beta',
    factorValue: 'Temperature'
  },
  form: new FormGroup({}),
  fields: [
    // The fields array should be structured as it is expected by the component.
    // This is a simplified example based on the provided component code.
    {
      type: 'stepper',
      fieldGroup: [
        {
          props: { label: 'Experiment Settings' },
          fieldGroup: [
            // Add the rest of the field configuration here
          ],
        },
        // Add other steps configuration here
      ],
    },
  ],
  options: {},
  specificMetagenomeOptions: [
    { value: 'gut', label: 'Gut' },
    { value: 'human', label: 'Human' },
    // ... other options
  ],
  metagenomeTypeOptions: [
    { value: 'ecological', label: 'Ecological' },
    { value: 'organism', label: 'Organism' },
    { value: 'synthetic', label: 'Synthetic' },
    { value: 'metagenome', label: 'Metagenome' },
  ],
  technologyTypeOptions: [
    { value: 'shotgun', label: 'Shotgun' },
    // Add other technology types as needed
  ],
  digestionMethodOptions: [
    { value: 'inGel', label: 'In Gel' },
    { value: 'FASP', label: 'FASP' },
    // Add other digestion methods as needed
  ],
};

// You can add more stories to represent different states of your component
