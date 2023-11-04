// metadata-checkboxselection.stories.ts
import { Meta, Story, moduleMetadata } from "@storybook/angular";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { CheckboxSelectionService } from "../app/metadata-checkboxselection/checkboxselectionservice";
import { MetaDataCheckboxSelectionComponent } from "../app/metadata-checkboxselection/metadata-checkboxselection.component";

// Mock the CheckboxSelectionService if needed
class MockCheckboxSelectionService {}

export default {
  title: "MetaDataCheckboxSelectionComponent",
  component: MetaDataCheckboxSelectionComponent,
  decorators: [
    moduleMetadata({
      declarations: [MetaDataCheckboxSelectionComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: CheckboxSelectionService,
          useClass: MockCheckboxSelectionService,
        },
        FormBuilder, // FormBuilder can be provided directly
      ],
    }),
  ],
} as Meta;

const Template: Story<MetaDataCheckboxSelectionComponent> = (
  args: MetaDataCheckboxSelectionComponent
) => ({
  component: MetaDataCheckboxSelectionComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  // You can set the default args for your component here.
};

// Add more stories here to represent different states of your component
