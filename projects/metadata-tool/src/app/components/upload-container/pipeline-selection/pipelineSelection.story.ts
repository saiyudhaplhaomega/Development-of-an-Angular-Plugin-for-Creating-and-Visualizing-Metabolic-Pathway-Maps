import { Meta, StoryObj, applicationConfig } from "@storybook/angular";
import { SelectionComponent } from "./pipeline-selection.component";
import { FormsModule } from "@angular/forms";
import { importProvidersFrom } from "@angular/core";
// Include other necessary imports, like Angular Material modules

export default {
  title: "Test/Components/PipelineSelection",
  component: SelectionComponent,
  decorators: [
    applicationConfig({
      providers: [
        // Include necessary modules and providers
        importProvidersFrom(FormsModule)
        // Add any Angular Material or other modules if your component depends on them
      ]
    })
  ]
} as Meta<SelectionComponent>;

const defaultPipelines = [
  { value: "generic_mzid_mzml", viewValue: "Generic (mzid+mzml)" },
  { value: "metaproteomeanalyzer", viewValue: "MetaProteomeAnalyzer" }
  // Add more pipeline options as needed
];

export const Default: StoryObj = {
  render: () => ({
    props: {
      pipelines: defaultPipelines,
      label: "Choose Pipeline"
    }
  })
};

export const WithSelectedPipeline: StoryObj = {
  render: () => ({
    props: {
      pipelines: defaultPipelines,
      label: "Choose Pipeline",
      selectedPipeline: {
        value: "generic_mzid_mzml",
        viewValue: "Generic (mzid+mzml)"
      }
    }
  })
};
